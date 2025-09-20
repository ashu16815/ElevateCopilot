import RequireAdmin from '@/components/RequireAdmin';
import AdminNav from '@/components/admin/AdminNav';

export default function Admin() {
  return (
    <RequireAdmin>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Admin Portal</h1>
        <AdminNav />
        
        <section className="mt-6 grid gap-6 md:grid-cols-3">
          <a className="ec-card p-5 hover:shadow-lg transition-shadow" href="/admin/dashboard">
            <h3 className="font-semibold text-lg mb-2">Dashboard</h3>
            <p className="text-sm text-gray-600">KPIs and live trained count.</p>
          </a>
          
          <a className="ec-card p-5 hover:shadow-lg transition-shadow" href="/admin/users">
            <h3 className="font-semibold text-lg mb-2">Users</h3>
            <p className="text-sm text-gray-600">Search, block/unblock, make admin.</p>
          </a>
          
          <a className="ec-card p-5 hover:shadow-lg transition-shadow" href="/admin/sessions">
            <h3 className="font-semibold text-lg mb-2">Sessions</h3>
            <p className="text-sm text-gray-600">Create, edit capacity, view seats left.</p>
          </a>
        </section>
      </main>
    </RequireAdmin>
  );
}