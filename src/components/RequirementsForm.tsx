'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

/* ── Types ────────────────────────────────────────────── */
type Status = 'idle' | 'loading' | 'success' | 'error';

interface Fields {
	name: string;
	email: string;
	mobile: string;
	address: string;
	requirements: string;
}
type Errs = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: '', email: '', mobile: '', address: '', requirements: '' };

/* ── Validation ───────────────────────────────────────── */
function validate(f: Fields): Errs {
	const e: Errs = {};
	if (f.name.trim().length < 2) e.name = 'Enter your name';
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email address';
	if (!/^[6-9]\d{9}$/.test(f.mobile)) e.mobile = 'Enter a valid 10-digit Indian mobile number';
	if (f.address.trim().length < 2) e.address = 'Enter your company name';
	if (f.requirements.trim().length > 0 && f.requirements.trim().length < 10)
		e.requirements = 'Please add a bit more detail';
	return e;
}

/* ── File helpers ─────────────────────────────────────── */
function fileIcon(f: File) {
	if (f.type.startsWith('image')) return '🖼️';
	if (f.type.includes('pdf')) return '📄';
	return '📊';
}
function fileSize(b: number) {
	if (b < 1024) return b + ' B';
	if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
	return (b / 1048576).toFixed(1) + ' MB';
}

/* ── Counter ──────────────────────────────────────────── */
// Deterministic from date — identical on every device for the same day
// Before 2 PM: base (30–60)  ·  After 2 PM: base + 20
function getDailyCount(): number {
  const now = new Date()
  const today = now.toISOString().slice(0, 10)
  let seed = 0
  for (let i = 0; i < today.length; i++) seed += today.charCodeAt(i)
  const base = (seed % 31) + 30
  return now.getHours() >= 14 ? base + 20 : base
}

/* ══════════════════════════════════════════════════════ */
export default function RequirementsForm() {
	const [fields, setFields] = useState<Fields>(EMPTY);
	const [errs, setErrs] = useState<Errs>({});
	const [files, setFiles] = useState<File[]>([]);
	const [dragging, setDragging] = useState(false);
	const [status, setStatus] = useState<Status>('idle');
	const [refId, setRefId] = useState('');
	const [counter, setCounter] = useState<number | null>(null);
	const fileRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setCounter(getDailyCount());
	}, []);

	/* ── Field change ───────────────────────────────────── */
	const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFields((p) => ({ ...p, [name]: value }));
		if (errs[name as keyof Fields]) setErrs((p) => ({ ...p, [name]: undefined }));
	};

	/* ── Files ──────────────────────────────────────────── */
	const addFiles = useCallback((incoming: File[]) => {
		setFiles((prev) => {
			const seen = new Set(prev.map((f) => f.name + f.size));
			const next = incoming.filter((f) => {
				if (f.size > 10 * 1024 * 1024) {
					alert(`"${f.name}" exceeds the 10 MB limit.`);
					return false;
				}
				return !seen.has(f.name + f.size);
			});
			return [...prev, ...next];
		});
	}, []);

	const removeFile = (i: number) => setFiles((p) => p.filter((_, idx) => idx !== i));

	const onFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			addFiles(Array.from(e.target.files));
			e.target.value = '';
		}
	};

	/* ── Drag-and-drop ──────────────────────────────────── */
	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setDragging(true);
	};
	const onDragLeave = () => setDragging(false);
	const onDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setDragging(false);
		addFiles(Array.from(e.dataTransfer.files));
	};

	/* ── Submit ─────────────────────────────────────────── */
	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		const e2 = validate(fields);
		if (Object.keys(e2).length) {
			setErrs(e2);
			setTimeout(
				() => document.querySelector('[data-err="1"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
				50,
			);
			return;
		}

		setStatus('loading');
		const fd = new FormData();
		(Object.entries(fields) as [string, string][]).forEach(([k, v]) => fd.append(k, v));
		files.forEach((f) => fd.append('files', f));

		try {
			const res = await fetch('/api/submit', { method: 'POST', body: fd });
			const json = await res.json();
			if (!res.ok) throw new Error(json.error || 'Submission failed');
			setRefId(json.refId);
			setCounter(getDailyCount());
			setStatus('success');
		} catch (err) {
			console.error(err);
			setStatus('error');
		}
	};

	const reset = () => {
		setFields(EMPTY);
		setFiles([]);
		setErrs({});
		setStatus('idle');
		setRefId('');
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	/* ── Helpers ────────────────────────────────────────── */
	const inputCls = (f: keyof Fields) => `field-input${errs[f] ? ' err' : ''}`;

	/* ══════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════ */
	return (
		<main className='relative z-10 min-h-screen px-4 pt-8 pb-12 sm:pt-12 sm:pb-20'>
			<div className='mx-auto' style={{ maxWidth: 680 }}>
				{/* ── Compact header ───────────────────────────── */}
				<header className='mb-5 sm:mb-6 animate-fade-down'>
					{/* Logo + counter on one row */}
					<div className='flex items-center justify-between mb-4 sm:mb-5'>
						<div className='inline-flex items-center bg-white/95 border border-white/30 rounded-xl px-3 py-1.5 backdrop-blur shadow-sm'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src='/logo.png' alt='Hi Sky Group' className='h-8 sm:h-10 w-auto object-contain' />
						</div>

						<div className='inline-flex items-center gap-1.5 bg-brand/15 border border-brand/30 rounded-full px-3 py-1.5 sm:px-4 animate-glow'>
							<span className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand animate-blink flex-shrink-0' />
							<span className='text-white/90 text-[11.5px] sm:text-[13px] font-medium'>
								<span className='text-brand font-bold'>{counter ?? '—'}+</span>
								<span className='hidden sm:inline'> clients</span> submitted today
							</span>
						</div>
					</div>

					{/* Title */}
					<h1 className='text-[24px] sm:text-[34px] lg:text-[40px] font-black text-white leading-[1.2] mb-1.5 sm:mb-2'>
						Submit Your <span className='text-brand'>Solar Project</span> Requirements
					</h1>
					<p className='text-white/65 text-[12.5px] sm:text-[14px] leading-relaxed'>
						Our experts will craft your perfect EPC solution and respond within 24 hours.
					</p>
				</header>

				{/* ── Form card ────────────────────────────────── */}
				<div className='glass rounded-2xl overflow-hidden animate-fade-up' style={{ animationDelay: '120ms' }}>
					{/* Card header — navy gradient, white text */}
					<div className='bg-gradient-to-r from-navy to-navy-mid px-5 py-4 sm:px-7 sm:py-4 border-b border-white/10'>
						<div className='flex items-center justify-between'>
							<div>
								<h2 className='text-[14px] sm:text-[16px] font-bold text-white'>
									📋 Project Requirements Form
								</h2>
								<p className='text-white/65 text-[11.5px] sm:text-[12.5px] mt-0.5'>
									Fields marked <span className='text-brand font-bold'>*</span> are required ·
									Response within 24 hrs
								</p>
							</div>
							<div className='hidden sm:flex gap-1 ml-4'>
								{[...Array(4)].map((_, i) => (
									<div key={i} className='w-5 h-1.5 rounded-full bg-brand/70' />
								))}
							</div>
						</div>
					</div>

					{/* Form body — white background */}
					<form onSubmit={submit} noValidate className='px-5 py-5 sm:px-8 sm:py-7 space-y-4 bg-white'>
						{/* Row 1: Company Name + Email */}
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<Field label='Your Name' icon='👤' required err={errs.name}>
								<input
									className={inputCls('name')}
									type='text'
									name='name'
									value={fields.name}
									onChange={change}
									placeholder='Rajesh Kumar'
									autoComplete='name'
									data-err={errs.name ? '1' : undefined}
								/>
							</Field>

							<Field label='Email Address' icon='📧' required err={errs.email}>
								<input
									className={inputCls('email')}
									type='email'
									name='email'
									value={fields.email}
									onChange={change}
									placeholder='contact@company.com'
									autoComplete='email'
									data-err={errs.email ? '1' : undefined}
								/>
							</Field>
						</div>

						{/* Row 2: Mobile only (full width) */}
						<Field label='Mobile Number' icon='📱' required err={errs.mobile}>
							<div className='flex'>
								<span className='flex items-center px-3.5 bg-gray-100 border border-gray-200 border-r-0 rounded-l-xl text-gray-500 text-[15px] select-none font-medium'>
									+91
								</span>
								<input
									className={`${inputCls('mobile')} rounded-l-none`}
									type='tel'
									name='mobile'
									value={fields.mobile}
									onChange={change}
									placeholder='9876543210'
									maxLength={10}
									autoComplete='tel'
									data-err={errs.mobile ? '1' : undefined}
								/>
							</div>
						</Field>

						{/* Address */}
						<Field label='Company Name' icon='🏢' required err={errs.address}>
							<input
								className={inputCls('address')}
								type='text'
								name='address'
								value={fields.address}
								onChange={change}
								placeholder='Hi Sky Group Pvt. Ltd.'
								autoComplete='organization'
								data-err={errs.address ? '1' : undefined}
							/>
						</Field>

						{/* Divider */}
						<div className='flex items-center gap-3 my-1'>
							<div className='flex-1 h-px bg-gray-200' />
							<span className='text-gray-400 text-[11px] uppercase tracking-widest font-semibold'>
								Project Details
							</span>
							<div className='flex-1 h-px bg-gray-200' />
						</div>

						{/* Requirements */}
						<Field label='Requirements & Project Details' icon='📋' err={errs.requirements}>
							<textarea
								className={inputCls('requirements')}
								name='requirements'
								value={fields.requirements}
								onChange={change}
								rows={6}
								maxLength={10000}
								placeholder={
									'Describe your solar energy requirements:\n' +
									'• Sanctioned load / power needed (KW or MW)\n' +
									'• Available rooftop area or land (sq.ft / acres)\n' +
									'• Current monthly electricity bill\n' +
									'• Any specific preferences or certifications needed\n' +
									'• Expected installation timeline'
								}
								data-err={errs.requirements ? '1' : undefined}
							/>
							<p className='text-right text-[11px] text-gray-400 mt-1'>
								{fields.requirements.length} / 10,000
							</p>
						</Field>

						{/* File upload */}
						<div>
							<label className='flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[.6px] text-gray-500 mb-2'>
								<span>📎</span>
								Attach Documents / Screenshots
								<span className='normal-case font-normal tracking-normal text-gray-400'>
									(optional)
								</span>
							</label>

							<div
								className={`drop-zone${dragging ? ' dragging' : ''}`}
								onDragOver={onDragOver}
								onDragLeave={onDragLeave}
								onDrop={onDrop}
								onClick={() => fileRef.current?.click()}
							>
								<input
									ref={fileRef}
									type='file'
									className='hidden'
									accept='.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.xlsx,.xls,.zip'
									multiple
									onChange={onFilePick}
								/>
								<div className='text-3xl mb-2'>📁</div>
								<p className='text-gray-500 text-[14px]'>
									<strong className='text-brand'>Click to upload</strong> or drag &amp; drop files
									here
								</p>
								<p className='text-gray-400 text-[12px] mt-1'>
									PDF, DOC, DOCX, JPG, PNG, XLSX &nbsp;·&nbsp; Max 10 MB per file
								</p>
							</div>

							{/* File chips */}
							{files.length > 0 && (
								<ul className='mt-2 space-y-1.5'>
									{files.map((f, i) => (
										<li
											key={i}
											className='flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2'
										>
											<span>{fileIcon(f)}</span>
											<span className='flex-1 truncate text-[13px] text-gray-700'>
												{f.name}{' '}
												<span className='text-gray-400 text-[11px]'>({fileSize(f.size)})</span>
											</span>
											<button
												type='button'
												onClick={() => removeFile(i)}
												className='text-gray-400 hover:text-red-500 text-xl leading-none transition-colors'
												aria-label='Remove file'
											>
												×
											</button>
										</li>
									))}
								</ul>
							)}
						</div>

						{/* Error banner */}
						{status === 'error' && (
							<div className='bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-[13px]'>
								⚠️ Something went wrong. Please try again or email us at{' '}
								<a href='mailto:purchase@hiskygroup.com' className='underline font-semibold'>
									purchase@hiskygroup.com
								</a>
							</div>
						)}

						{/* Submit */}
						<button
							type='submit'
							disabled={status === 'loading'}
							className='w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand to-brand-dark
                         text-white font-bold text-[14px] sm:text-[15.5px] tracking-wide rounded-[14px] py-3.5 sm:py-4
                         transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(109,179,63,.38)]
                         active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                         relative overflow-hidden'
						>
							{status === 'loading' ? (
								<>
									<span className='w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin' />
									Sending…
								</>
							) : (
								<>⚡ Submit Requirements to Hi Sky Group</>
							)}
						</button>

						<p className='text-center text-[11px] sm:text-[12px] text-gray-400 leading-relaxed'>
							🔒 Your information is secure and used solely to process your inquiry.
							<br />
							By submitting you consent to Hi Sky Group contacting you regarding your requirements.
						</p>
					</form>

					{/* Card footer */}
					<div className='flex items-center justify-between gap-3 flex-wrap px-5 py-3 sm:px-8 sm:py-4 bg-gray-50 border-t border-gray-100'>
						<div>
							<p className='text-gray-500 text-[12px]'>
								Need help? &nbsp;
								<a href='tel:+919625190691' className='text-brand hover:underline font-semibold'>
									+91 96251 90691
								</a>
								&nbsp;|&nbsp;
								<a href='mailto:purchase@hiskygroup.com' className='text-brand hover:underline font-semibold'>
									purchase@hiskygroup.com
								</a>
							</p>
							<p className='text-gray-400 text-[11px] mt-1'>
								📍 A-1508, ATS Bouquet, Plot No A-2/2, Sector 132, Noida (UP) - 201301
							</p>
						</div>
						<p className='text-gray-400 text-[12px]'>🔐 256-bit Encrypted</p>
					</div>
				</div>
			</div>

			{/* ── Success modal ─────────────────────────────── */}
			{status === 'success' && (
				<div className='fixed inset-0 bg-black/75 backdrop-blur-xl z-50 flex items-center justify-center p-5'>
					<div className='bg-white rounded-2xl shadow-2xl p-10 text-center max-w-md w-full animate-pop-in border border-gray-100'>
						<div
							className='w-20 h-20 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-4xl mx-auto mb-6 animate-pop-in'
							style={{ animationDelay: '120ms' }}
						>
							✓
						</div>
						<h2 className='text-2xl font-black text-gray-900 mb-3'>Requirements Submitted!</h2>
						<p className='text-gray-500 text-[14px] leading-relaxed mb-6'>
							Our solar experts will review your project and reach out within{' '}
							<strong className='text-gray-800'>24 business hours</strong>. Thank you for choosing Hi Sky
							Group!
						</p>

						<div className='bg-green-50 border border-green-200 rounded-xl p-4 text-left mb-6 space-y-2.5'>
							{[
								['✅', 'Reference ID', refId],
								['📧', 'Inquiry sent to', 'purchase@hiskygroup.com'],
								['⏱️', 'Expected response', '24 business hours'],
								['📞', 'You may be contacted at', `+91 ${fields.mobile}`],
							].map(([icon, label, val]) => (
								<div key={label} className='flex gap-2 text-[13px] text-gray-600'>
									<span>{icon}</span>
									<span>
										<strong className='text-gray-800'>{label}:</strong> {val}
									</span>
								</div>
							))}
						</div>

						<button
							onClick={reset}
							className='bg-gray-100 border border-gray-200 text-gray-700 rounded-xl px-7 py-3 text-[14px] font-semibold hover:bg-gray-200 transition-colors'
						>
							Submit Another Requirement
						</button>
					</div>
				</div>
			)}
		</main>
	);
}

/* ── Field wrapper ────────────────────────────────────── */
function Field({
	label,
	icon,
	required,
	err,
	children,
}: {
	label: string;
	icon: string;
	required?: boolean;
	err?: string;
	children: React.ReactNode;
}) {
	return (
		<div>
			<label className='flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[.6px] text-gray-500 mb-2'>
				<span>{icon}</span>
				{label}
				{required && <span className='text-brand text-[15px] leading-none font-bold'>*</span>}
			</label>
			{children}
			{err && (
				<p className='text-red-600 text-[12px] mt-1.5 font-medium' data-err='1'>
					{err}
				</p>
			)}
		</div>
	);
}
