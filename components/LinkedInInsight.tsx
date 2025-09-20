import Script from 'next/script';

export default function LinkedInInsight() {
  const pid = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
  if (!pid) return null;

  const px = `https://px.ads.linkedin.com/collect/?pid=${pid}&fmt=gif`;

  return (
    <>
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          _linkedin_partner_id = '${pid}';
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
            if (!l) {
              window.lintrk = function(a, b) {
                window.lintrk.q.push([a, b]);
              };
              window.lintrk.q = [];
            }
            var s = document.getElementsByTagName('script')[0];
            var b = document.createElement('script');
            b.type = 'text/javascript';
            b.async = true;
            b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} alt="" src={px} />
      </noscript>
    </>
  );
}