import React from 'react';
import Layout from '../layouts/Layout';

const SupportPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-16 divide-y divide-white/10 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Get in touch</h2>
                <p className="mt-4 leading-7 text-gray-300">
                  Have questions about NexaVault? Our team is here to help you navigate your sustainable wealth journey.
                </p>
                <div className="mt-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <span className="material-symbols-outlined text-white">chat</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Live Chat</h3>
                      <p className="mt-1 text-gray-300">Available 24/7 for immediate assistance.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <span className="material-symbols-outlined text-white">mail</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Email Support</h3>
                      <p className="mt-1 text-gray-300">support@nexavault.io</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                <div className="rounded-2xl bg-white/5 p-10 ring-1 ring-white/10">
                  <h3 className="text-base font-semibold leading-7 text-white">General Inquiries</h3>
                  <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-300">
                    <div className="mt-1">
                      <dt className="inline text-gray-400">Email:</dt>
                      <dd className="inline"> info@nexavault.io</dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-2xl bg-white/5 p-10 ring-1 ring-white/10">
                  <h3 className="text-base font-semibold leading-7 text-white">Press & Media</h3>
                  <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-300">
                    <div className="mt-1">
                      <dt className="inline text-gray-400">Email:</dt>
                      <dd className="inline"> press@nexavault.io</dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-2xl bg-white/5 p-10 ring-1 ring-white/10 sm:col-span-2">
                  <h3 className="text-base font-semibold leading-7 text-white">Send us a message</h3>
                  <form className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-white">First name</label>
                        <div className="mt-2.5">
                          <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-white">Last name</label>
                        <div className="mt-2.5">
                          <input type="text" name="last-name" id="last-name" className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">Email</label>
                      <div className="mt-2.5">
                        <input type="email" name="email" id="email" className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">Message</label>
                      <div className="mt-2.5">
                        <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"></textarea>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button type="submit" className="rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Send message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
