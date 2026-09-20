




const steps = [
  {
    number: "01",
    title: "Create your profile",
    text: "Share your introduction and what you are looking for in a life partner.",
  },
  {
    number: "02",
    title: "Profile review",
    text: "Profiles will be reviewed before appearing in member search.",
  },
  {
    number: "03",
    title: "Connect with consent",
    text: "Express interest and choose whether to share your contact details.",
  },
];

const privacyFeatures = [
  {
    title: "Your contact stays private",
    text: "Your phone number will not appear on public pages.",
  },
  {
    title: "Photos are your choice",
    text: "Adding a photo will be optional, with controlled sharing.",
  },
  {
    title: "Family involvement",
    text: "A parent or guardian can help with the candidate’s permission.",
  },
  {
    title: "Respectful connections",
    text: "Our service is for Muslim adults aged 18 and above seeking marriage.",
  },
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="container navigation">
          <a href="/" className="brand" aria-label="Attock VIP Rishta home">
            <span className="brand-symbol" aria-hidden="true">A</span>
            <span>
              Attock <span className="brand-accent">VIP</span> Rishta
              <small>Made for our community</small>
            </span>
          </a>

          <nav aria-label="Main navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#privacy">Privacy</a>
            <a href="#get-started" className="button button-small">
              Get started
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="eyebrow">ATTOCK CITY · MUSLIM MATRIMONY</span>
              <h1>A meaningful connection.<br /><em>A new beginning.</em></h1>
              <p className="hero-description">
                Find a life partner with shared values, close to home.
                A respectful, family-friendly rishta platform being built
                for the Muslim community in Attock.
              </p>

              <div className="hero-actions">
                <a href="#get-started" className="button">Start your journey →</a>
                <a href="#how-it-works" className="button button-outline">
                  How it works
                </a>
              </div>

              <p className="hero-note">
                Free at launch. No registration or verification fees.
              </p>
            </div>

            <aside className="promise-card" aria-label="Our approach">
              <span className="card-label">A THOUGHTFUL WAY TO FIND A RISHTA</span>
              <div className="decorative-mark" aria-hidden="true">✦</div>
              <h2>Shared values.<br />Local connections.</h2>
              <p>
                A space for serious intentions, family involvement,
                and choices that stay in your hands.
              </p>
              <div className="promise-tags">
                <span>Attock city</span>
                <span>Privacy first</span>
                <span>Family friendly</span>
              </div>
              <div className="card-bottom">
                Built around respect, consent, and community.
              </div>
            </aside>
          </div>
        </section>

        <section id="how-it-works" className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">A SIMPLE JOURNEY</span>
              <h2>From an introduction to a possibility.</h2>
              <p>Here is how the platform will work when registration opens.</p>
            </div>

            <div className="steps-grid">
              {steps.map((step) => (
                <article className="step-card" key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="privacy" className="section privacy-section">
          <div className="container privacy-grid">
            <div className="section-heading">
              <span className="eyebrow">RESPECT AT EVERY STEP</span>
              <h2>Your story.<br />Your choice to share.</h2>
              <p>
                Finding a rishta is personal. We are designing privacy
                controls into the way profiles and introductions work.
              </p>
              <p className="privacy-note">
                Identity checks help confirm identity. They do not
                guarantee someone’s character or suitability.
              </p>
            </div>

            <div className="privacy-features">
              {privacyFeatures.map((feature) => (
                <article className="privacy-feature" key={feature.title}>
                  <span className="feature-check" aria-hidden="true">✓</span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="get-started" className="section">
          <div className="container">
            <div className="launch-panel">
              <span className="eyebrow">OUR FIRST CHAPTER: ATTOCK</span>
              <h2>Good beginnings start close to home.</h2>
              <p>
                We are preparing our free service for Attock city.
                Profile registration and member search are coming soon.
              </p>
              <span className="launch-status">
                <span aria-hidden="true" /> In development · Registration not open
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <div>
            <strong>Attock VIP Rishta</strong>
            <p>Respectful connections for our community.</p>
          </div>
          <p>For Muslim adults aged 18+ · Attock city</p>
        </div>
      </footer>
    </>
  );
}

