export default function AdminNav() {
  return (
    <nav className="flex gap-3 text-sm mb-6">
      <a className="ec-btn ec-btn-secondary" href="/admin/dashboard">
        Dashboard
      </a>
      <a className="ec-btn ec-btn-secondary" href="/admin/users">
        Users
      </a>
      <a className="ec-btn ec-btn-secondary" href="/admin/sessions">
        Sessions
      </a>
    </nav>
  );
}
