import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SignUpPage: React.FC = () => {
  const { toggleTheme } = useTheme();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else navigate('/login');
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 hero-gradient relative p-16 flex-col justify-between overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white">shield_with_heart</span>
            </div>
            <span className="text-2xl font-display font-bold text-white tracking-tight">NexaVault</span>
          </Link>
          <div className="max-w-md">
            <h1 className="text-5xl font-display font-bold text-white leading-tight mb-6">
              Invest in a <span className="text-primary">greener</span> future of finance.
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Join 250,000+ investors bridging the gap between high-yield DeFi and sustainable real-world impact.
            </p>
            <div className="space-y-6">
              {[
                "Institutional-grade security protocols",
                "Carbon-neutral yield strategies",
                "Fractionalized green energy assets"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <span className="material-symbols-outlined text-primary text-sm">check</span>
                  </div>
                  <p className="text-gray-200">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative z-10 glass-badge p-6 rounded-2xl max-w-xs self-start">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/30 rounded-lg">
              <span className="material-symbols-outlined text-white">eco</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">12.4k Tons</p>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Carbon Offset This Month</p>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-slate-950">
        <div className="max-w-md w-full">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm">shield_with_heart</span>
            </div>
            <span className="text-xl font-display font-bold text-secondary dark:text-white">NexaVault</span>
          </Link>

          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-2xl font-display font-bold text-secondary dark:text-white">
                {step === 1 && "Create Your Account"}
                {step === 2 && "Contact Details"}
                {step === 3 && "Account Setup"}
                {step === 4 && "Security"}
              </h2>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Step {step} of 4</span>
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-4 gap-2 text-[10px] font-bold uppercase tracking-tight">
              <div className={step >= 1 ? "text-primary" : "text-gray-400"}>Personal Info</div>
              <div className={step >= 2 ? "text-primary" : "text-gray-400"}>Contact Details</div>
              <div className={step >= 3 ? "text-primary" : "text-gray-400"}>Account Setup</div>
              <div className={step >= 4 ? "text-primary" : "text-gray-400"}>Security</div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            {step === 1 && (
              <>
                <div className="mb-8">
                  <p className="text-gray-500 dark:text-gray-400">Please provide your legal name to begin your journey.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">Full Name</label>
                  <input autoFocus className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="name" placeholder="John Doe" type="text" required />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="phone">Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                      <span className="material-symbols-outlined text-xl">call</span>
                    </span>
                    <input className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="phone" placeholder="+1 (555) 000-0000" type="tel" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="address">Residential Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                      <span className="material-symbols-outlined text-xl">home</span>
                    </span>
                    <input className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="address" placeholder="123 Sustainability Ave" type="text" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="city">City</label>
                    <input className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="city" placeholder="San Francisco" type="text" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="zip">Postal Code</label>
                    <input className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="zip" placeholder="94105" type="text" required />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">mail</span>
                    <input className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="email" placeholder="john@example.com" type="email" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">Choose Username</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">alternate_email</span>
                    <input className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="username" placeholder="johndoe_green" type="text" required />
                  </div>
                  <p className="mt-2 text-xs text-gray-400 italic flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">info</span>
                    Your unique identifier on the NexaVault platform.
                  </p>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">Password</label>
                  <div className="relative">
                    <input className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="password" placeholder="••••••••" type="password" required />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" type="button">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                  </div>
                  <div className="mt-3 flex gap-1">
                    <div className="h-1 flex-1 bg-primary rounded-full"></div>
                    <div className="h-1 flex-1 bg-primary rounded-full"></div>
                    <div className="h-1 flex-1 bg-primary rounded-full"></div>
                    <div className="h-1 flex-1 bg-gray-200 dark:bg-slate-800 rounded-full"></div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Strong password. Use at least 8 characters with numbers and symbols.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="confirm-password">Confirm Password</label>
                  <div className="relative">
                    <input className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="confirm-password" placeholder="••••••••" type="password" required />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" type="button">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-800 rounded transition-colors" id="terms" type="checkbox" required />
              </div>
              <label className="ml-3 block text-sm text-gray-500 dark:text-gray-400" htmlFor="terms">
                I agree to the <a className="text-primary font-semibold hover:underline" href="#">Terms of Service</a> and <a className="text-primary font-semibold hover:underline" href="#">Privacy Policy</a>.
              </label>
            </div>

            <div className="flex gap-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-1/3 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 font-bold py-4 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-slate-900 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl rotate-180">arrow_forward</span>
                  Back
                </button>
              )}
              <button className={`${step > 1 ? 'w-2/3' : 'w-full'} bg-primary hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transform active:scale-[0.98]`}>
                {step === 4 ? "Create Account" : "Next Step"}
                <span className="material-symbols-outlined text-xl">{step === 4 ? 'shield' : 'arrow_forward'}</span>
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?
            <Link className="font-bold text-primary hover:text-emerald-600 transition-colors" to="/login">Log in</Link>
          </p>

          <div className="mt-16 pt-8 border-t border-gray-50 dark:border-gray-900">
            <div className="flex flex-wrap justify-center gap-6 opacity-40 grayscale">
              {[
                { icon: "verified_user", label: "SOC2 COMPLIANT" },
                { icon: "lock", label: "AES-256 ENCRYPTION" },
                { icon: "account_balance", label: "FDIC INSURED PARTNERS" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">{item.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg text-secondary dark:text-white transition-all hover:scale-110"
      >
        <span className="material-symbols-outlined block dark:hidden">dark_mode</span>
        <span className="material-symbols-outlined hidden dark:block">light_mode</span>
      </button>
    </div>
  );
};

export default SignUpPage;
