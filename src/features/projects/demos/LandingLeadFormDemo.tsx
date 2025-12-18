import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { CheckCircle2, Mail, Sparkles, User } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function isValidEmail(email: string) {
  // Simple, practical validation for demo purposes
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export const LandingLeadFormDemo = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const canSubmit = useMemo(() => {
    return form.name.trim().length > 0 && isValidEmail(form.email);
  }, [form.email, form.name]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) next.email = 'Please enter your email.';
    else if (!isValidEmail(form.email)) next.email = 'Please enter a valid email address.';
    if (form.message.trim().length > 0 && form.message.trim().length < 10) {
      next.message = 'If you add a message, please include at least 10 characters.';
    }
    return next;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus('submitting');
    // Simulate a real network request (e.g., Netlify Forms / backend)
    await new Promise((r) => setTimeout(r, 900));
    setStatus('success');
  }

  function reset() {
    setForm({ name: '', email: '', company: '', message: '' });
    setErrors({});
    setStatus('idle');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Interactive Demo</div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            Landing Page Lead Form
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            A lightweight landing page section with validation, loading state, and a clean success UX.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card hover={false} className="bg-secondary/20 border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground">
              <span className="text-primary font-semibold">Fast</span>
              <span>•</span>
              <span className="text-primary font-semibold">Accessible</span>
              <span>•</span>
              <span className="text-primary font-semibold">Responsive</span>
            </div>

            <h4 className="text-3xl font-bold tracking-tight">
              Get a pixel‑perfect React + Tailwind build
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {' '}
                in days.
              </span>
            </h4>
            <p className="text-muted-foreground">
              Share your Figma or screenshots. I’ll deliver a clean, maintainable build with semantic HTML, responsive layout, and
              a professional handoff.
            </p>

            <ul className="text-sm text-muted-foreground space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Component-based structure
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Keyboard-friendly inputs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Polished loading + success UX
              </li>
            </ul>
          </div>
        </Card>

        <Card hover={false} className="border-white/10">
          {status === 'success' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="h-6 w-6" />
                <div className="text-lg font-semibold">Request received!</div>
              </div>
              <p className="text-sm text-muted-foreground">
                This is a demo success state. In a real project, this would send to Netlify Forms, a serverless function, or your API.
              </p>
              <Button onClick={reset} variant="outline">
                Submit another request
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="name">
                  Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={cn(
                      'w-full h-11 rounded-md bg-white/5 border px-10 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      errors.name ? 'border-red-500/60' : 'border-white/10'
                    )}
                    placeholder="Dante (example)"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                </div>
                {errors.name ? (
                  <p id="name-error" className="text-xs text-red-400">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="email">
                  Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={cn(
                      'w-full h-11 rounded-md bg-white/5 border px-10 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      errors.email ? 'border-red-500/60' : 'border-white/10'
                    )}
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email ? (
                  <p id="email-error" className="text-xs text-red-400">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="company">
                  Company (optional)
                </label>
                <input
                  id="company"
                  value={form.company}
                  onChange={(e) => update('company', e.target.value)}
                  className="w-full h-11 rounded-md bg-white/5 border border-white/10 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  placeholder="Acme Inc."
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="message">
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className={cn(
                    'w-full min-h-[96px] rounded-md bg-white/5 border px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    errors.message ? 'border-red-500/60' : 'border-white/10'
                  )}
                  placeholder="Tell me what you need built (optional)."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message ? (
                  <p id="message-error" className="text-xs text-red-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="text-xs text-muted-foreground">
                  {canSubmit ? 'Ready to submit.' : 'Enter name + valid email to enable submit.'}
                </div>

                <Button type="submit" disabled={!canSubmit || status === 'submitting'} className="min-w-[160px]">
                  {status === 'submitting' ? 'Sending…' : 'Request a quote'}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};


