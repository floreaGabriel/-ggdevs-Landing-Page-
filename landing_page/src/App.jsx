import React from 'react';
import './App.css';
import BenefitCard from "./components/BenefitCard";
import CodeBlock from "./components/CodeBlock";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
const KubernetesManifest = () => {
  return (
    <div className="code-container">
      <pre className="k8s-manifest">
        <code>
          <span className="yaml-comment"># GGDevs Custom Kubernetes CRD</span>
          <span className="yaml-comment"># Simple, reliable web application deployment</span>
          {'\n'}
          <span className="yaml-key">apiVersion</span>: <span className="yaml-string">apiextensions.k8s.io/v1</span>
          {'\n'}
          <span className="yaml-key">kind</span>: <span className="yaml-string">CustomResourceDefinition</span>
          {'\n'}
          <span className="yaml-key">metadata</span>:
          {'\n'}
          <span className="yaml-indent-1"></span><span className="yaml-key">name</span>: <span className="yaml-string">home.ggdevs.site</span>
          {'\n\n'}
          <span className="yaml-key">spec</span>:
          {'\n'}
          <span className="yaml-indent-1"></span><span className="yaml-key">group</span>: <span className="yaml-string">ggdevs.com</span>
          {'\n'}
          <span className="yaml-indent-1"></span><span className="yaml-key">versions</span>:
          {'\n'}
          <span className="yaml-indent-2"></span>- <span className="yaml-key">name</span>: <span className="yaml-string">v1</span>
          {'\n'}
          <span className="yaml-indent-3"></span><span className="yaml-key">served</span>: <span className="yaml-boolean">true</span>
          {'\n'}
          <span className="yaml-indent-3"></span><span className="yaml-key">storage</span>: <span className="yaml-boolean">true</span>
          {'\n\n'}
          <span className="yaml-key">---</span>
          {'\n\n'}
          <span className="yaml-key">apiVersion</span>: <span className="yaml-string">ggdevs.site/v1</span>
          {'\n'}
          <span className="yaml-key">kind</span>: <span className="yaml-string">WebApp</span>
          {'\n'}
          <span className="yaml-key">metadata</span>:
          {'\n'}
          <span className="yaml-indent-1"></span><span className="yaml-key">name</span>: <span className="yaml-string">my-startup-app</span>
          {'\n\n'}
          <span className="yaml-key">spec</span>:
          {'\n'}
          <span className="yaml-indent-1"></span><span className="yaml-key">appName</span>: <span className="yaml-string">"startup-website"</span>
          {'\n'}
          <span className="yaml-indent-1"></span><span className="yaml-key">domain</span>: <span className="yaml-string">"mystartup.com"</span>
          {'\n'}
          <span className="yaml-indent-1"></span><span className="yaml-key">replicas</span>: <span className="yaml-number">3</span>
          {'\n'}
          <span className="yaml-indent-1"></span><span className="yaml-key">environment</span>: <span className="yaml-string">"production"</span>
        </code>
      </pre>
    </div>
  );
};





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
          <KubernetesManifest />
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
