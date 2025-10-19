import BenefitCard from "./components/BenefitCard";
import CodeBlock from "./components/CodeBlock";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

function App() {
  return (

    <>
    <div className="min-h-screen flex flex-col bg-black">
      <Hero />
      <BenefitCard title="Why Developers Choose GGDevs">
        <p>
          At GGDevs, our mission is to make Kubernetes deployments simple, reliable, and developer-focused.
          Our solutions are built for rapid integration, easy scalability, and robust security. Whether you’re deploying a proof-of-concept or scaling to thousands of users, we offer tools that help devs ship faster and safer.
        </p>
        <p>
          Our APIs are intuitive, our CLI feels like home, and our docs actually help you get things done. All this, while making sure your clusters run smoothly and cost-effectively.
        </p>
        <CodeBlock code={
          `# Provision a new cluster with just one command
          ggdevs create cluster mycluster --nodes=3 --region=eu-west

          # Deploy securely with zero downtime
          ggdevs deploy solutionx --env=production --secure`
        } />
        <p>
          Experience auto-healing, seamless monitoring, and instant rollback. If you break things, roll back with a single command — no drama!
        </p>
      </BenefitCard>

      <BenefitCard title="What Sets Us Apart">
        <ul className="space-y-3 text-left inline-block mx-auto">
          <li>🚀 Instant Setup & Zero Config</li>
          <li>🔒 Security at the Core</li>
          <li>📦 One-Command Deploys</li>
          <li>📈 Observability Built-In</li>
          <li>🤝 Open Source & Community Driven</li>
        </ul>
        <CodeBlock code={
            `# Monitoring is built-in
            ggdevs monitor mycluster --live

            # Community plugins? Just npm install those!
            ggdevs plugin install autoscaler`
        } />
      </BenefitCard>

      <Footer />
    </div>

    </>
  );
}

export default App;

