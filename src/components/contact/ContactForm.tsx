import React, { useState } from 'react';
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon, SendIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { sendContactMessage } from '../../utils/contact';
import { isValidEmail } from '../../utils/validation';
import { buttonStyles, inputClass, labelClass } from '../ui/styles';
import { WindowFrame } from '../ui/WindowFrame';
import { FormField } from './FormField';

type FieldKey = 'name' | 'email' | 'subject' | 'message';
type Status = 'idle' | 'submitting' | 'success' | 'activation' | 'error';

const initialValues: Record<FieldKey, string> = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const { content, update, editMode } = usePortfolio();
  const { contact } = content;
  const [values, setValues] = useState(initialValues);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorDetail, setErrorDetail] = useState('');
  const busy = status === 'submitting';

  const setValue = (key: FieldKey, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const fieldError = (key: FieldKey, source = values) => {
    const value = source[key].trim();
    if (key === 'name' && !value) return 'Please enter your full name.';
    if (key === 'email' && !value) return 'Please enter your email address.';
    if (key === 'email' && !isValidEmail(source.email)) return 'Please enter a valid email address.';
    if (key === 'subject' && !value) return 'Please add a subject.';
    if (key === 'message' && !value) return 'Please write a message.';
    return undefined;
  };

  const validate = () => {
    const next: Partial<Record<FieldKey, string>> = {};
    (Object.keys(values) as FieldKey[]).forEach((key) => {
      const message = fieldError(key);
      if (message) next[key] = message;
    });
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as FieldKey[])[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    if (honeypot.trim()) {
      setStatus('success');
      setValues(initialValues);
      return;
    }

    setStatus('submitting');
    setErrorDetail('');
    const result = await sendContactMessage(
      contact.email.trim() || 'almorfelyka@gmail.com',
      {
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim()
      },
      contact.formEndpoint
    );

    if (!result.ok) {
      setErrorDetail(result.error ?? '');
      setStatus('error');
      return;
    }

    setValues(initialValues);
    setStatus(result.activation ? 'activation' : 'success');
  };

  const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(values.subject || 'Portfolio inquiry')}&body=${encodeURIComponent(
    `${values.message}\n\n— ${values.name} (${values.email})`
  )}`;

  const resetForm = () => {
    setStatus('idle');
    setErrorDetail('');
  };

  return (
    <WindowFrame title="new_message.txt" className="self-start" bodyClassName="p-6 sm:p-8">
      {editMode &&
      <div className="mb-6 rounded-2xl border border-dashed border-clay/50 bg-surface p-4">
          <label htmlFor="form-endpoint" className={labelClass}>
            Custom form endpoint (optional)
          </label>
          <input
          id="form-endpoint"
          type="url"
          value={contact.formEndpoint}
          onChange={(e) => update((c) => ({ ...c, contact: { ...c.contact, formEndpoint: e.target.value } }))}
          placeholder="Leave blank to email you via FormSubmit"
          className={inputClass} />
        
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Messages go to {contact.email || 'your contact email'}. The first send from this site emails you an activation link — confirm it once, then every new message arrives in that inbox.
          </p>
        </div>
      }

      {status === 'success' || status === 'activation' ?
      <div role="status" className="flex flex-col items-center py-12 text-center">
          <CheckCircle2Icon className="h-10 w-10 text-clay" aria-hidden="true" />
          <h3 className="mt-4 font-display text-2xl text-ink">
            {status === 'activation' ? 'Check your inbox to activate' : 'Message sent'}
          </h3>
          <p className="mt-2 max-w-sm text-muted">
            {status === 'activation' ?
            `Check ${contact.email} (including spam) for an email from FormSubmit and click the confirmation link. After that, every new message is delivered there.` :
            "Thank you for reaching out — I'll get back to you as soon as I can."}
          </p>
          <button type="button" onClick={resetForm} className={`${buttonStyles.secondary} mt-6`}>
            Send another message
          </button>
        </div> :

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input id="contact-company" name="_honey" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="contact-name" name="name" label="Full Name" value={values.name} onChange={(v) => setValue('name', v)} onBlur={() => setErrors((e) => ({ ...e, name: fieldError('name') }))} placeholder="Juan Dela Cruz" error={errors.name} autoComplete="name" disabled={busy} />
            <FormField id="contact-email" name="email" label="Email Address" type="email" value={values.email} onChange={(v) => setValue('email', v)} onBlur={() => setErrors((e) => ({ ...e, email: fieldError('email') }))} placeholder="you@example.com" error={errors.email} autoComplete="email" disabled={busy} />
          </div>
          <FormField id="contact-subject" name="subject" label="Subject" value={values.subject} onChange={(v) => setValue('subject', v)} onBlur={() => setErrors((e) => ({ ...e, subject: fieldError('subject') }))} placeholder="Internship opportunity, collaboration, project…" error={errors.subject} disabled={busy} />
          <FormField id="contact-message" name="message" label="Message" multiline value={values.message} onChange={(v) => setValue('message', v)} onBlur={() => setErrors((e) => ({ ...e, message: fieldError('message') }))} placeholder="Tell me a little about what you have in mind." error={errors.message} disabled={busy} />

          <p className="text-xs text-muted">
            All fields marked <span className="text-clay">*</span> are required. Send Message emails {contact.email}.
          </p>

          <button type="submit" disabled={busy} className={`${buttonStyles.primary} w-full sm:w-auto`}>
            {busy ?
          <>
                <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
              </> :

          <>
                <SendIcon className="h-4 w-4" aria-hidden="true" /> Send Message
              </>
          }
          </button>

          {status === 'error' &&
        <div role="alert" className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm">
              <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-700" aria-hidden="true" />
              <div>
                <p className="font-medium text-red-800">Something went wrong</p>
                <p className="mt-1 text-red-800/90">
                  {errorDetail || "Your message couldn't be sent."} Please try again, or{' '}
                  <a href={mailtoHref} className="underline underline-offset-2">email directly</a>.
                </p>
              </div>
            </div>
        }
        </form>
      }
    </WindowFrame>);

}
