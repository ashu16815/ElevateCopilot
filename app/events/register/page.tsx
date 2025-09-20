import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register for a Free Session - ElevateCopilot',
  description: 'Register for our free AI literacy session. No cost, no sales pitch - just practical learning.',
}

export default function RegisterPage() {
  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Register (Free)</h1>
      
      <form 
        action="https://api.web3forms.com/submit" 
        method="POST" 
        className="mt-6 grid gap-4"
      >
        <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
        
        <input 
          name="name" 
          required 
          placeholder="Full name" 
          className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        
        <input 
          name="email" 
          type="email" 
          required 
          placeholder="Work email" 
          className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        
        <input 
          name="company" 
          placeholder="Company (optional)" 
          className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        
        <input 
          name="date" 
          placeholder="Preferred date (YYYY-MM-DD)" 
          className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        
        <textarea 
          name="questions" 
          placeholder="What do you want to learn?" 
          className="rounded-md border px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        
        <button 
          type="submit"
          className="px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors"
        >
          Register
        </button>
      </form>
      
      <p className="mt-3 text-sm text-gray-600">
        We'll email your calendar invite and materials. Sessions run in NZT, via Teams/Zoom.
      </p>
    </div>
  )
}
