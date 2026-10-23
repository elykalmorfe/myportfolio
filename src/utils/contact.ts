import { isValidEmail, isValidUrl } from './validation';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSendResult {
  ok: boolean;
  activation?: boolean;
  error?: string;
}

const FORMSUBMIT_AJAX = (email: string) => `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;
const FORMSUBMIT_POST = (email: string) => `https://formsubmit.co/${encodeURIComponent(email)}`;

function pageUrl() {
  return typeof window === 'undefined' ? '' : window.location.href.split('#')[0] + '#contact';
}

function buildFields(payload: ContactPayload): Record<string, string> {
  return {
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
    _subject: `Portfolio message: ${payload.subject}`,
    _template: 'table',
    _captcha: 'false',
    _replyto: payload.email,
    _url: pageUrl()
  };
}

function readSuccess(payload: unknown): { success: boolean; message: string } {
  if (!payload || typeof payload !== 'object') return { success: false, message: '' };
  const data = payload as { success?: boolean | string; message?: string };
  const flag = data.success;
  return {
    success: flag === true || String(flag).toLowerCase() === 'true',
    message: typeof data.message === 'string' ? data.message : ''
  };
}

async function postFormData(url: string, fields: Record<string, string>) {
  const body = new FormData();
  Object.entries(fields).forEach(([key, value]) => body.append(key, value));
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      referrerPolicy: 'origin',
      signal: controller.signal,
      body
    });
    let payload: unknown = null;
    try {
      payload = await res.json();
    } catch {
      payload = null;
    }
    return { res, payload };
  } finally {
    window.clearTimeout(timer);
  }
}

function submitThroughHiddenForm(action: string, fields: Record<string, string>): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('No document'));
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.name = `contact-sink-${Date.now()}`;
    iframe.setAttribute('aria-hidden', 'true');
    iframe.style.display = 'none';

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = action;
    form.target = iframe.name;
    form.acceptCharset = 'UTF-8';
    form.style.display = 'none';

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    const cleanup = () => {
      form.remove();
      iframe.remove();
    };

    const timer = window.setTimeout(() => {
      cleanup();
      resolve();
    }, 2500);

    iframe.addEventListener('load', () => {
      window.clearTimeout(timer);
      cleanup();
      resolve();
    });

    document.body.append(iframe, form);
    form.submit();
  });
}

export async function sendContactMessage(
  toEmail: string,
  payload: ContactPayload,
  customEndpoint = ''
): Promise<ContactSendResult> {
  const destination = isValidEmail(toEmail) ? toEmail.trim() : '';
  const custom = customEndpoint.trim();
  const ajaxEndpoint = isValidUrl(custom) ? custom : destination ? FORMSUBMIT_AJAX(destination) : '';

  if (!ajaxEndpoint) {
    return { ok: false, error: 'No email destination is configured.' };
  }

  const fields = buildFields(payload);

  try {
    const { res, payload: responsePayload } = await postFormData(ajaxEndpoint, fields);
    const { success, message } = readSuccess(responsePayload);
    const activation = /activat/i.test(message);

    if (success || activation) {
      return { ok: true, activation };
    }

    if (destination && (/web server|HTML files|Unable to submit/i.test(message) || !res.ok)) {
      await submitThroughHiddenForm(FORMSUBMIT_POST(destination), fields);
      return { ok: true, activation: true };
    }

    if (!res.ok) {
      return { ok: false, error: message || `Request failed (${res.status}).` };
    }

    if (responsePayload && !success) {
      return { ok: false, error: message || 'The mail service rejected this message.' };
    }

    if (res.ok && !responsePayload) {
      return { ok: true };
    }

    return { ok: false, error: message || 'The mail service did not confirm delivery.' };
  } catch {
    if (destination) {
      try {
        await submitThroughHiddenForm(FORMSUBMIT_POST(destination), fields);
        return { ok: true, activation: true };
      } catch {
        /* fall through */
      }
    }
    return { ok: false, error: 'Could not reach the mail service. Check your connection and try again.' };
  }
}
