const Partnerships = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
            Our Partnerships & Ecosystem
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            We collaborate with leading Microsoft Cloud Solution Providers (CSPs), resellers, and industry experts to deliver high-quality training and adoption programs. ElevateCopilot is independent and not affiliated with or endorsed by Microsoft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">C</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Cloud Solution Providers</h3>
            <p className="text-muted text-sm">
              Working with leading CSPs to deliver enterprise-ready training solutions
            </p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">R</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Resellers & Partners</h3>
            <p className="text-muted text-sm">
              Network of trusted partners delivering training across different regions
            </p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-green-600">E</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Industry Experts</h3>
            <p className="text-muted text-sm">
              Collaboration with subject matter experts and thought leaders
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partnerships
