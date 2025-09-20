export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold">Privacy & Data Use</h1>
      
      <div className="prose prose-lg max-w-none mt-6">
        <p>
          We collect only what's needed (email, name, role/industry, M365/Copilot usage, engagement). 
          You can export your data from <strong>Account</strong>. We never sell personal data; 
          insights are reported in aggregate.
        </p>
        
        <h2 className="text-xl font-semibold mt-6">Consents:</h2>
        <ul className="list-disc pl-6 mt-2">
          <li>Marketing emails</li>
          <li>Anonymized analytics</li>
          <li>Optional third-party sharing</li>
        </ul>
      </div>
    </div>
  );
}
