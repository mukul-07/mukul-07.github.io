# Don't Guess. Let the Customer Tell You.

*Notes on building robotics observability without inventing the detection system the customer should own.*

Three pilots into a robotics observability tool, you start to notice a pattern.

Every customer arrives with the same first question: "does it detect [our specific thing]?" For one, it was a particular FSM state that meant "the dock alignment failed, retry without escalating." For another, it was an altitude band their drone shouldn't be in during specific phases of a mission. For a third, it was a torque signature on a manipulator that meant the gripper had slipped half a millimeter. None of these were in the tool. None of them could plausibly be in the tool, because no two customers had the same one.

The tempting move at this point is to build the smart system. Train a model on the customer's data, let it learn what "normal" looks like, surface anomalies automatically. It's the move every PM is told to make in 2026. It demos brilliantly. It reads as visionary in the deck. And it is, almost always, wrong.

This is a post about why I made the opposite call. Why, after watching the customer-specific-detector pattern repeat across deployments, I shipped a configurable rule framework instead of an auto-detection system, why I think most robotics observability companies are going to build the wrong thing here, and what to build instead.

## The 45-anomaly problem

If you sit down with a senior robotics engineer and ask them to enumerate everything that can go wrong on a real robot in production, you'll end up with something like 45 distinct anomaly types. They decompose pretty cleanly into six domains: locomotion, perception, planning, localization, behavior, and hardware.

<svg width="100%" viewBox="0 0 680 540" role="img" xmlns="http://www.w3.org/2000/svg">
<title>The robotics anomaly landscape</title>
<desc>Roughly 45 anomaly types decomposed across six domains. Eight are common across most robot fleets and shown in teal. The remaining thirty-plus are customer-specific and shown in gray.</desc>
<text x="40" y="28" font-family="sans-serif" font-size="13" font-weight="500" fill="#3D3D3A">~45 anomaly types across 6 domains</text>
<text x="40" y="46" font-family="sans-serif" font-size="11" fill="#5F5E5A">8 are common across most fleets (teal). The other 30+ are customer-specific (gray).</text>
<rect x="8" y="60" width="215" height="220" rx="8" fill="#F8F8F4" stroke="#D4D2CB" stroke-width="0.5"/>
<text x="20" y="82" font-family="sans-serif" font-size="13" font-weight="500" fill="#3D3D3A">Locomotion</text>
<text x="20" y="98" font-family="sans-serif" font-size="11" fill="#5F5E5A">8 anomalies</text>
<text x="20" y="120" font-family="sans-serif" font-size="11" font-weight="500" fill="#0F6E56">stall<animate attributeName="opacity" values="1;0.4;1" keyTimes="0;0.5;1" dur="1.5s" begin="0.3s" fill="freeze"/></text>
<text x="20" y="136" font-family="sans-serif" font-size="11" fill="#7A7973">motor failure</text>
<text x="20" y="152" font-family="sans-serif" font-size="11" fill="#7A7973">wheel slip</text>
<text x="20" y="168" font-family="sans-serif" font-size="11" fill="#7A7973">drive fault</text>
<text x="20" y="184" font-family="sans-serif" font-size="11" fill="#7A7973">command timeout</text>
<text x="20" y="200" font-family="sans-serif" font-size="11" fill="#7A7973">velocity divergence</text>
<text x="20" y="216" font-family="sans-serif" font-size="11" fill="#7A7973">traction loss</text>
<text x="20" y="232" font-family="sans-serif" font-size="11" fill="#7A7973">gear failure</text>
<rect x="232" y="60" width="215" height="220" rx="8" fill="#F8F8F4" stroke="#D4D2CB" stroke-width="0.5"/>
<text x="244" y="82" font-family="sans-serif" font-size="13" font-weight="500" fill="#3D3D3A">Perception</text>
<text x="244" y="98" font-family="sans-serif" font-size="11" fill="#5F5E5A">9 anomalies</text>
<text x="244" y="120" font-family="sans-serif" font-size="11" font-weight="500" fill="#0F6E56">sensor dropout<animate attributeName="opacity" values="1;0.4;1" keyTimes="0;0.5;1" dur="1.5s" begin="0.3s" fill="freeze"/></text>
<text x="244" y="136" font-family="sans-serif" font-size="11" font-weight="500" fill="#0F6E56">collision<animate attributeName="opacity" values="1;0.4;1" keyTimes="0;0.5;1" dur="1.5s" begin="0.3s" fill="freeze"/></text>
<text x="244" y="152" font-family="sans-serif" font-size="11" fill="#7A7973">lidar saturation</text>
<text x="244" y="168" font-family="sans-serif" font-size="11" fill="#7A7973">camera occlusion</text>
<text x="244" y="184" font-family="sans-serif" font-size="11" fill="#7A7973">calibration drift</text>
<text x="244" y="200" font-family="sans-serif" font-size="11" fill="#7A7973">depth holes</text>
<text x="244" y="216" font-family="sans-serif" font-size="11" fill="#7A7973">object misdetection</text>
<text x="244" y="232" font-family="sans-serif" font-size="11" fill="#7A7973">point cloud sparsity</text>
<text x="244" y="248" font-family="sans-serif" font-size="11" fill="#7A7973">exposure failure</text>
<rect x="456" y="60" width="215" height="220" rx="8" fill="#F8F8F4" stroke="#D4D2CB" stroke-width="0.5"/>
<text x="468" y="82" font-family="sans-serif" font-size="13" font-weight="500" fill="#3D3D3A">Planning</text>
<text x="468" y="98" font-family="sans-serif" font-size="11" fill="#5F5E5A">7 anomalies</text>
<text x="468" y="120" font-family="sans-serif" font-size="11" font-weight="500" fill="#0F6E56">planning failure<animate attributeName="opacity" values="1;0.4;1" keyTimes="0;0.5;1" dur="1.5s" begin="0.3s" fill="freeze"/></text>
<text x="468" y="136" font-family="sans-serif" font-size="11" fill="#7A7973">path not found</text>
<text x="468" y="152" font-family="sans-serif" font-size="11" fill="#7A7973">planner timeout</text>
<text x="468" y="168" font-family="sans-serif" font-size="11" fill="#7A7973">infeasible goal</text>
<text x="468" y="184" font-family="sans-serif" font-size="11" fill="#7A7973">recovery loop</text>
<text x="468" y="200" font-family="sans-serif" font-size="11" fill="#7A7973">deadlock</text>
<text x="468" y="216" font-family="sans-serif" font-size="11" fill="#7A7973">costmap inflation</text>
<rect x="8" y="295" width="215" height="220" rx="8" fill="#F8F8F4" stroke="#D4D2CB" stroke-width="0.5"/>
<text x="20" y="317" font-family="sans-serif" font-size="13" font-weight="500" fill="#3D3D3A">Localization</text>
<text x="20" y="333" font-family="sans-serif" font-size="11" fill="#5F5E5A">6 anomalies</text>
<text x="20" y="355" font-family="sans-serif" font-size="11" font-weight="500" fill="#0F6E56">localization loss<animate attributeName="opacity" values="1;0.4;1" keyTimes="0;0.5;1" dur="1.5s" begin="0.3s" fill="freeze"/></text>
<text x="20" y="371" font-family="sans-serif" font-size="11" fill="#7A7973">AMCL particle collapse</text>
<text x="20" y="387" font-family="sans-serif" font-size="11" fill="#7A7973">GPS dropout</text>
<text x="20" y="403" font-family="sans-serif" font-size="11" fill="#7A7973">kidnap event</text>
<text x="20" y="419" font-family="sans-serif" font-size="11" fill="#7A7973">frame transform error</text>
<text x="20" y="435" font-family="sans-serif" font-size="11" fill="#7A7973">drift exceeded</text>
<rect x="232" y="295" width="215" height="220" rx="8" fill="#F8F8F4" stroke="#D4D2CB" stroke-width="0.5"/>
<text x="244" y="317" font-family="sans-serif" font-size="13" font-weight="500" fill="#3D3D3A">Behavior</text>
<text x="244" y="333" font-family="sans-serif" font-size="11" fill="#5F5E5A">7 anomalies</text>
<text x="244" y="355" font-family="sans-serif" font-size="11" font-weight="500" fill="#0F6E56">FSM error<animate attributeName="opacity" values="1;0.4;1" keyTimes="0;0.5;1" dur="1.5s" begin="0.3s" fill="freeze"/></text>
<text x="244" y="371" font-family="sans-serif" font-size="11" fill="#7A7973">mission timeout</text>
<text x="244" y="387" font-family="sans-serif" font-size="11" fill="#7A7973">task fail</text>
<text x="244" y="403" font-family="sans-serif" font-size="11" fill="#7A7973">action server error</text>
<text x="244" y="419" font-family="sans-serif" font-size="11" fill="#7A7973">precondition fail</text>
<text x="244" y="435" font-family="sans-serif" font-size="11" fill="#7A7973">postcondition fail</text>
<text x="244" y="451" font-family="sans-serif" font-size="11" fill="#7A7973">state inconsistency</text>
<rect x="456" y="295" width="215" height="220" rx="8" fill="#F8F8F4" stroke="#D4D2CB" stroke-width="0.5"/>
<text x="468" y="317" font-family="sans-serif" font-size="13" font-weight="500" fill="#3D3D3A">Hardware</text>
<text x="468" y="333" font-family="sans-serif" font-size="11" fill="#5F5E5A">8 anomalies</text>
<text x="468" y="355" font-family="sans-serif" font-size="11" font-weight="500" fill="#0F6E56">battery low<animate attributeName="opacity" values="1;0.4;1" keyTimes="0;0.5;1" dur="1.5s" begin="0.3s" fill="freeze"/></text>
<text x="468" y="371" font-family="sans-serif" font-size="11" font-weight="500" fill="#0F6E56">e-stop<animate attributeName="opacity" values="1;0.4;1" keyTimes="0;0.5;1" dur="1.5s" begin="0.3s" fill="freeze"/></text>
<text x="468" y="387" font-family="sans-serif" font-size="11" fill="#7A7973">thermal warning</text>
<text x="468" y="403" font-family="sans-serif" font-size="11" fill="#7A7973">comm bus error</text>
<text x="468" y="419" font-family="sans-serif" font-size="11" fill="#7A7973">peripheral fault</text>
<text x="468" y="435" font-family="sans-serif" font-size="11" fill="#7A7973">firmware mismatch</text>
<text x="468" y="451" font-family="sans-serif" font-size="11" fill="#7A7973">voltage drop</text>
<text x="468" y="467" font-family="sans-serif" font-size="11" fill="#7A7973">current spike</text>
</svg>

Mature fleets don't actually monitor all 45. Most monitor between 5 and 15 at any given time. About 8 of those are the same across most fleets: stall, collision, sensor dropout, planning failure, localization loss, FSM error, battery low, e-stop. If you're shipping any kind of mobile autonomy product, you'll meet those 8 in your first month.

The other 30+ are deeply customer-specific. The drone customer cares about altitude deviation and motor RPM divergence. The surgical arm cares about force exceedance during contact. The picking robot cares about gripper slip and object misdetection. The construction-site AGV cares about lane departure relative to a custom-marked path. None of these are "common." All of them are critical to the customer that has them.

If you build a robotics observability product, this is the central tension. The 8 common anomalies feel like the floor. They tempt you to ship them, declare victory, call it a day. The 30+ tail is where every customer actually lives, and it's the part that makes them happy or unhappy in the long run.

The first time I got this wrong, I shipped two hardcoded detectors: stall and path-deviation. Three pilots in, every customer wanted three more of theirs. The math didn't work. I was going to be writing Python forever, one customer at a time, while the engineering team grew angrier and the velocity collapsed.

That was the moment to rebuild the abstraction.

## Why "the system figures it out" is a trap

When you're staring at the long-tail problem, the temptation to reach for ML is strong. Industry conditioning around AI in 2026 makes it almost reflexive. Every adjacent observability product is "AI-powered." Every conference talk is about "intelligent anomaly detection." Every investor wants to know how the model gets smarter over time.

I almost did it.

Then I sat down and worked out what shipping an ML-based anomaly detector actually costs the customer. Not in compute. In actual operational burden, distributed over the life of the deployment.

<svg width="100%" viewBox="0 0 680 360" role="img" xmlns="http://www.w3.org/2000/svg">
<title>What auto-detect costs versus what configure costs</title>
<desc>Four dimensions of comparison between ML-based auto-detection and configurable rule-based detection: upfront cost, behavior when the robot changes, behavior when the detector misfires, and time to add a new failure mode. Auto-detect carries a recurring labor tax across all four dimensions.</desc>
<text x="180" y="30" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#712B13">Auto-detect (ML)</text>
<text x="500" y="30" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#085041">Configure (rules)</text>

<g opacity="1">
<animate attributeName="opacity" values="0;0;1" keyTimes="0;0;1" dur="0.4s" fill="freeze"/>
<text x="340" y="62" text-anchor="middle" font-family="sans-serif" font-size="11" font-style="italic" fill="#5F5E5A">Upfront cost</text>
<rect x="40" y="70" width="280" height="44" rx="8" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="180" y="98" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#712B13">training data, labels, validation set</text>
<rect x="360" y="70" width="280" height="44" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="500" y="98" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">one YAML file</text>
</g>

<g opacity="1">
<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.385;1" dur="0.65s" fill="freeze"/>
<text x="340" y="138" text-anchor="middle" font-family="sans-serif" font-size="11" font-style="italic" fill="#5F5E5A">When the robot changes</text>
<rect x="40" y="146" width="280" height="44" rx="8" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="180" y="174" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#712B13">retrain. relabel. revalidate.</text>
<rect x="360" y="146" width="280" height="44" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="500" y="174" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">edit one line</text>
</g>

<g opacity="1">
<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.555;1" dur="0.9s" fill="freeze"/>
<text x="340" y="214" text-anchor="middle" font-family="sans-serif" font-size="11" font-style="italic" fill="#5F5E5A">When it misfires</text>
<rect x="40" y="222" width="280" height="44" rx="8" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="180" y="250" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#712B13">opaque. customer calls vendor.</text>
<rect x="360" y="222" width="280" height="44" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="500" y="250" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">read the rule. fix it.</text>
</g>

<g opacity="1">
<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.652;1" dur="1.15s" fill="freeze"/>
<text x="340" y="290" text-anchor="middle" font-family="sans-serif" font-size="11" font-style="italic" fill="#5F5E5A">Time to add a new failure mode</text>
<rect x="40" y="298" width="280" height="44" rx="8" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="180" y="326" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#712B13">data collection sprint</text>
<rect x="360" y="298" width="280" height="44" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="500" y="326" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">30 seconds</text>
</g>
</svg>

**Training data.** To detect anomalies, you need a labeled corpus of "normal" and "abnormal" runs. Most customers don't have one. Many can't generate one without a quarter of dedicated work, and even then the labeling is contested ("is that a real anomaly or just a Friday afternoon shift change?"). You either supply your own pre-trained model that may not match the customer's robot, or you push the data-collection problem onto a customer who has many other problems.

**Drift.** The customer's robot will change. New product mix on the line, new dock layout, software update, hardware revision. Each of these shifts the distribution your model trained on. False positives spike, the customer loses trust, you have to retrain, and you have a recurring labor cost embedded in every deployment forever.

**Opacity.** When the model fires for what looks like a wrong reason, no one in the customer's ops team can tell why. They have to call you. You have to look at the inputs, decide whether the model behaved correctly given those inputs, and then explain it. This is consulting work, billed as a product feature.

**False positives at scale.** A 95%-accurate model on a robot publishing five state messages a second produces a false positive every ten minutes. The customer turns off the alerts within a week. The product is now decorative.

The "auto-detection" framing makes a promise. The promise is: you, the customer, won't have to specify what an anomaly is. We, the vendor, will figure it out. This is a beautiful promise. It is also a transfer of work that the customer's ops team will eventually catch you on, because in production, the work doesn't disappear. It moves.

The customer's domain knowledge, the thing the customer actually has and you don't, is the most valuable asset in the room. The auto-detect framing wastes it.

## Give the customer the language

The opposite move is unsexy and right.

Don't try to figure out what an anomaly is. Give the customer a small, sharp language for telling you what an anomaly is, and honor what they tell you.

<svg width="100%" viewBox="0 0 680 290" role="img" xmlns="http://www.w3.org/2000/svg">
<title>A configurable anomaly rule</title>
<desc>YAML rule definition with five fields: name, topic the rule subscribes to, field within that topic, condition the field must meet, duration the condition must persist, and cooldown to prevent re-firing.</desc>
<rect x="40" y="30" width="600" height="240" rx="12" fill="#FBEAF0" stroke="#993556" stroke-width="0.5"/>
<text x="60" y="62" font-family="sans-serif" font-size="11" font-weight="500" fill="#72243E">anomaly rule · YAML</text>

<text x="60" y="100" font-family="sans-serif" font-size="12" fill="#993556">name</text>
<text x="200" y="100" font-family="monospace" font-size="13" fill="#3D3D3A" opacity="1">dock-alignment-failed<animate attributeName="opacity" values="0;0;1" keyTimes="0;0;1" dur="0.3s" fill="freeze"/></text>

<text x="60" y="130" font-family="sans-serif" font-size="12" fill="#993556">topic</text>
<text x="200" y="130" font-family="monospace" font-size="13" fill="#3D3D3A" opacity="1">/robot/fsm/state<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.333;1" dur="0.45s" fill="freeze"/></text>

<text x="60" y="160" font-family="sans-serif" font-size="12" fill="#993556">field</text>
<text x="200" y="160" font-family="monospace" font-size="13" fill="#3D3D3A" opacity="1">status.status<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.5;1" dur="0.6s" fill="freeze"/></text>

<text x="60" y="190" font-family="sans-serif" font-size="12" fill="#993556">condition</text>
<text x="200" y="190" font-family="monospace" font-size="13" fill="#3D3D3A" opacity="1">equals "DOCK_ALIGN_FAIL"<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.6;1" dur="0.75s" fill="freeze"/></text>

<text x="60" y="220" font-family="sans-serif" font-size="12" fill="#993556">duration</text>
<text x="200" y="220" font-family="monospace" font-size="13" fill="#3D3D3A" opacity="1">5 seconds<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.667;1" dur="0.9s" fill="freeze"/></text>

<text x="60" y="250" font-family="sans-serif" font-size="12" fill="#993556">cooldown</text>
<text x="200" y="250" font-family="monospace" font-size="13" fill="#3D3D3A" opacity="1">30 seconds<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.714;1" dur="1.05s" fill="freeze"/></text>
</svg>

Two rule kinds is enough for most of the territory. State equality: "fire when this field equals this value for at least N seconds." Numeric threshold: "fire when this field is above or below this value for at least N seconds." Add cooldowns to prevent flap. Add a graceful "missing field" handler so a misnamed topic doesn't crash the agent. Ship one Python detector module that loads the rules at startup.

That's it. That's the framework.

A customer whose robot publishes a state topic with a field that takes the value "ERROR" when their FSM enters its error state writes one YAML block. The agent fires when it sees that condition for the duration they specified. Cooldown prevents re-firing during a five-minute recovery loop. The customer didn't need to teach the agent anything. They told it.

The same module supports thousands of deployed rules across thousands of different robot schemas. The agent doesn't grow. The rules grow.

This is the pattern, and once you see it, you start to see how often it's the right shape for hardware/software products that interact with diverse customer domains. Don't model the customer's world inside your product. Give the customer a notation for describing their own world, and execute against the description.

## Why this is hard to defend in the building

If letting the customer tell you is so obviously right, why does almost every competitor build the auto-detect version?

Because the pressures inside the company push the wrong way.

Engineering wants to build the smart system. It's more interesting work. Auto-detection has papers, conferences, and an ML team that wants something to do. A YAML rule loader has none of that. The senior engineer who could lead an ML platform doesn't want to lead a config parser.

Sales wants to demo "AI-powered." It sells decks. Saying "the customer writes a config file" loses the room before you've finished the sentence, even though it describes a more durable product.

Marketing wants to claim the AI category. It wants to show up in analyst reports as an AI-driven observability product. A rule engine reads as commodity.

The customer's procurement team, who reads buzzword checklists from vendor briefings, will sometimes ask "does it learn?" because they've been told to ask. Saying "no, it's configurable" sounds like the wrong answer.

Investors want ML in the architecture diagram. It supports the valuation story.

And the friendly champion in the pilot, the one who is excited about the demo, often wants to feel like the tool is "smart." A YAML file feels less smart than a model.

Every one of these pressures pushes you toward the auto-detect version. The PM is the only person in the building whose job is to absorb those pressures and hold the position, because the actual user, the customer's ops team on day 90, will be served by the boring, transparent, configurable thing. Not the smart, opaque, retraining-needing thing.

This is what "decisions over features" looks like in the wild. You write the decision down, you defend it through the bullshit cycle, you ship the version that the day-90 user will thank you for, and you accept that the demo doesn't sparkle as much.

## When ML actually earns its place

To be intellectually honest: ML earns its place sometimes.

<svg width="100%" viewBox="0 0 680 380" role="img" xmlns="http://www.w3.org/2000/svg">
<title>When ML earns its place versus when rules win</title>
<desc>2x2 matrix. Y-axis is failure frequency, X-axis is whether the failure mode is easy to express as a rule. Most of the territory is rules-win. ML earns its place only in the upper-left: frequent failures that are genuinely hard to express as a rule.</desc>

<text x="20" y="200" transform="rotate(-90, 20, 200)" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="500" fill="#5F5E5A">Failure frequency</text>
<text x="350" y="365" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="500" fill="#5F5E5A">Easy to express as a rule?</text>
<text x="50" y="50" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7A7973">frequent</text>
<text x="50" y="290" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7A7973">rare</text>
<text x="220" y="345" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7A7973">no</text>
<text x="500" y="345" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7A7973">yes</text>

<g opacity="1">
<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.333;1" dur="0.6s" fill="freeze"/>
<rect x="380" y="60" width="280" height="135" rx="10" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="520" y="100" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#085041">Write a rule</text>
<text x="520" y="130" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#0F6E56">stall, FSM error, battery low,</text>
<text x="520" y="146" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#0F6E56">topic dropout, threshold exceeded,</text>
<text x="520" y="162" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#0F6E56">most operational anomalies</text>
<text x="520" y="184" text-anchor="middle" font-family="sans-serif" font-size="10" font-style="italic" fill="#0F6E56">where rule-based wins outright</text>
</g>

<g opacity="1">
<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.6;1" dur="1.0s" fill="freeze"/>
<rect x="380" y="210" width="280" height="125" rx="10" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="520" y="250" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#085041">Write a rule</text>
<text x="520" y="280" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#0F6E56">cheap to add, no ongoing burden.</text>
<text x="520" y="296" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#0F6E56">One rule per long-tail failure mode.</text>
<text x="520" y="318" text-anchor="middle" font-family="sans-serif" font-size="10" font-style="italic" fill="#0F6E56">low marginal cost</text>
</g>

<g opacity="1">
<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.714;1" dur="1.4s" fill="freeze"/>
<rect x="80" y="210" width="280" height="125" rx="10" fill="#F1F0EB" stroke="#A8A6A0" stroke-width="0.5"/>
<text x="220" y="250" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#5F5E5A">Don't bother</text>
<text x="220" y="280" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7A7973">rare and ineffable. You'll never</text>
<text x="220" y="296" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7A7973">get enough training data.</text>
<text x="220" y="318" text-anchor="middle" font-family="sans-serif" font-size="10" font-style="italic" fill="#7A7973">accept the blind spot</text>
</g>

<g opacity="1">
<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.778;1" dur="1.8s" fill="freeze"/>
<rect x="80" y="60" width="280" height="135" rx="10" fill="#FAEEDA" stroke="#854F0B" stroke-width="0.5"/>
<text x="220" y="100" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#633806">ML may earn its place</text>
<text x="220" y="130" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#854F0B">"the lidar looks weird," subtle drift,</text>
<text x="220" y="146" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#854F0B">cross-modal patterns no operator</text>
<text x="220" y="162" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#854F0B">can write down concretely</text>
<text x="220" y="184" text-anchor="middle" font-family="sans-serif" font-size="10" font-style="italic" fill="#854F0B">small slice of failure modes</text>
</g>
</svg>

The case where rules genuinely lose is the upper-left of that 2x2. A failure mode is frequent enough to matter, AND its signature is genuinely hard to express as a rule. "The lidar point cloud looks weird in a way that correlates with the robot getting lost twenty seconds later." A human operator can sometimes recognize it; nobody can write a clean rule for it.

That is real ML territory. Cross-modal patterns, subtle drift in high-dimensional sensor data, signatures that humans recognize but can't reduce to a topic-and-field condition. If you have a customer whose primary failure mode lives there, and they have the data to support training, ML may be the right move for that detector.

But notice what you've done. You've earned the right to use ML for one specific detector after exhausting the rule framework, on a problem that genuinely demands it, with a customer whose data supports it. That is a much narrower claim than "we are an AI-powered observability platform," and it is the only honest one most products can make.

The rule framework should be the floor. ML, when it's right at all, should be a specific module that earns its place against a specific failure mode for a specific customer. Not the architectural premise. Not the marketing claim. A tactic, used carefully, in the small slice of the territory where it works.

## Closing

The bigger lesson here is about respect.

The auto-detect framing is, underneath, a quiet claim that the vendor knows the customer's robot better than the customer does. That with enough data and enough cleverness, you can figure out what they should care about. This is almost never true. The customer has been running their robot for years before you arrived. They know its failure modes intimately, in the granular, situational way that is hard to externalize but absolutely real.

The rule framework is the opposite claim. It says: you know your robot. We know how to capture, replay, and operate observability infrastructure. Your half is the domain knowledge; our half is the substrate. Tell us what to look for in your language, and we'll do the rest.

That posture, treating the customer as the domain expert and yourself as the substrate provider, is one of the most underrated PM positions you can take in a hardware-adjacent product. It's harder to demo. It's harder to market. And in the long run, it's what makes the product survive contact with twenty different customers' twenty different worlds.

Don't try to guess what the customer means by "broken." Build the language they can use to tell you. Then get out of the way.
