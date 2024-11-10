import './aboutcard.css'

function AboutCard() {

  return (
    <div className="about_container px-10 py-8 rounded-2xl">
      <h1 className="text-6xl">About Intentify</h1>
      <h2 className="text-4xl py-4">What is Intentify?</h2>
      <p className="pb-2">At Intentify, we're on a mission to decode the purpose behind every web visit. Our innovative platform analyzes website content and determines the intent of the user based on the URL provided. By understanding the user's goals, Intentify helps businesses and developers tailor experiences, optimize content, and engage their audience more effectively.</p>
      <h2 className="text-4xl py-4">How does it work?</h2>
      <p className="pb-2">With just a URL, Intentify scrapes the content of a webpage, extracts key information, and uses intelligent algorithms to generate a multiple-choice question that classifies the visitor's intent. Whether you're looking to improve your marketing strategy, optimize your content, or simply gain insights into your audience, Intentify gives you the answers you need.</p>
      <h2 className="text-4xl py-4">Why Intentify?</h2>
      <ul className="list-disc px-4">
        <li className="list-item"><b className="font-semibold"><u>Smart Intent Classification</u></b>: We turn data into actionable insights by predicting user behavior.</li>
        <li className="list-item"><b className="font-semibold"><u>Simple Integration</u></b>: Easily add Intentify to your existing website or platform to enhance user experience.</li>
        <li className="list-item"><b className="font-semibold"><u>Data-Driven Decisions</u></b>: Unlock the power of understanding what your users really want.</li>
      </ul>
      <div className="text-center text-2xl p-10 w-9/12 m-auto">
      Join the future of web analytics. Let Intentify help you unlock a deeper connection with your users by understanding why they visit.
      </div>
    </div>
  )
}

export default AboutCard