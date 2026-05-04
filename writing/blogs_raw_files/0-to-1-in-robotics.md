# 0→1 in Robotics: What's Different, What's the Same

*Notes from owning delivery for two commercial product launches and a string of autonomous-fleet programs at Fortune 500 plants. Where the SaaS playbook helps, where it breaks, and what to do about it.*

Across roughly five years of commercial robotics work, I've owned delivery for two product launches and a string of autonomous-fleet programs at Fortune 500 customer sites. The first commercial product was an autonomous lawnmower (Nov 2021 to Apr 2023). The second was an outdoor material-movement robot (Apr 2023 to Apr 2025), which scaled to 35+ units across 10+ cities. After that came autonomous-forklift programs at three Fortune 500 plants in three different industries, on three different continents.

Different form factors, different customers, different failure modes. But by the third or fourth deployment I started recognizing the patterns: the places where startup playbooks I'd absorbed from years of reading SaaS post-mortems still worked, and the places where they very loudly didn't.

This is what I think transfers, what doesn't, and what I'd tell anyone going 0→1 in robotics today, especially around the thing nobody warns you about, which is customer-readiness.

<svg width="100%" viewBox="0 0 680 200" role="img" xmlns="http://www.w3.org/2000/svg">
<title>Five years of commercial robotics programs</title>
<desc>Autonomous lawnmower (10+ units, Nov 2021 to Apr 2023), then a material movement robot (35+ units across 10+ cities, Apr 2023 to Apr 2025), then autonomous forklift programs at three Fortune 500 plants (Apr 2025 to Mar 2026). Bar widths proportional to duration.</desc>
<rect x="40" y="50" width="188" height="110" rx="8" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
<text x="134" y="80" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" font-weight="500" fill="#3C3489">Autonomous lawnmower</text>
<text x="134" y="102" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="12" fill="#534AB7">Nov 2021 to Apr 2023</text>
<text x="134" y="138" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" font-weight="500" fill="#3C3489">10+ units</text>
<rect x="240" y="50" width="266" height="110" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="373" y="80" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" font-weight="500" fill="#085041">Material movement robot</text>
<text x="373" y="102" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="12" fill="#0F6E56">Apr 2023 to Apr 2025</text>
<text x="373" y="138" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" font-weight="500" fill="#085041">35+ units across 10+ cities</text>
<rect x="518" y="50" width="122" height="110" rx="8" fill="#FAEEDA" stroke="#854F0B" stroke-width="0.5"/>
<text x="579" y="80" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" font-weight="500" fill="#633806">Forklifts</text>
<text x="579" y="102" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="12" fill="#854F0B">2025 to 2026</text>
<text x="579" y="138" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" font-weight="500" fill="#633806">3 F500 plants</text>
</svg>

## The parts that transfer cleanly

A lot of the standard advice still holds. Talk to customers before you build. Build the smallest thing that delivers value. Ship early, instrument everything, decide based on data instead of vibes. Keep the team small and the feedback loop tight. None of this becomes wrong just because there's a chassis involved.

The software layers, in particular, behave like software. The fleet management dashboard, the telemetry pipeline, the OTA update system, the customer portal, the sales tooling: these all benefit from the same iterative, ship-fast culture you'd apply to any product. Our fleet management system, built by a small dev team, moved at SaaS speeds because that's what it actually was: a software layer wrapped around a fleet of physical things.

You also get the meta-benefits: observability, feature flags, gradual rollouts. We could push a new path-planner version to one robot, watch what happened, then promote across the fleet. That's classic deployment hygiene applied to autonomy code, and it works.

So if you're coming from SaaS into robotics, you're not starting from zero. About forty percent of the muscle memory transfers.

The other sixty is where it gets interesting.

## Where the playbook breaks

**Iteration is not symmetric.** In SaaS, the gap between "I think this might be the bug" and "I've shipped a fix to all users" can be hours. In robotics, that gap is at minimum a deploy-to-fleet cycle, and at worst it's "we need to physically retrieve the unit, swap the mount, and ship it back." The asymmetry isn't just speed; it's that some bugs cost a truck roll or a dead unit. You learn very quickly to over-test the things you can't easily roll back.

<svg width="100%" viewBox="0 0 680 260" role="img" xmlns="http://www.w3.org/2000/svg">
<title>Iteration cycles: SaaS versus robotics</title>
<desc>SaaS iteration through code, deploy, users, and telemetry runs in minutes to hours. Robotics iteration through code, simulation, hardware-in-the-loop, OTA fleet, field deploy, and recovery runs in days to weeks.</desc>
<defs>
<marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
<path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</marker>
</defs>
<text x="40" y="40" font-family="sans-serif" font-size="14" font-weight="500" fill="#3D3D3A">SaaS iteration</text>
<text x="640" y="40" text-anchor="end" font-family="sans-serif" font-size="12" fill="#5F5E5A">Minutes to hours</text>
<rect x="40" y="60" width="132" height="40" rx="6" fill="#E6F1FB" stroke="#185FA5" stroke-width="0.5"/>
<text x="106" y="80" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" fill="#0C447C">Code</text>
<line x1="174" y1="80" x2="194" y2="80" stroke="#5F5E5A" stroke-width="1.5" marker-end="url(#arrow)"/>
<rect x="196" y="60" width="132" height="40" rx="6" fill="#E6F1FB" stroke="#185FA5" stroke-width="0.5"/>
<text x="262" y="80" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" fill="#0C447C">Deploy</text>
<line x1="330" y1="80" x2="350" y2="80" stroke="#5F5E5A" stroke-width="1.5" marker-end="url(#arrow)"/>
<rect x="352" y="60" width="132" height="40" rx="6" fill="#E6F1FB" stroke="#185FA5" stroke-width="0.5"/>
<text x="418" y="80" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" fill="#0C447C">Users hit it</text>
<line x1="486" y1="80" x2="506" y2="80" stroke="#5F5E5A" stroke-width="1.5" marker-end="url(#arrow)"/>
<rect x="508" y="60" width="132" height="40" rx="6" fill="#E6F1FB" stroke="#185FA5" stroke-width="0.5"/>
<text x="574" y="80" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" fill="#0C447C">Telemetry</text>
<text x="40" y="170" font-family="sans-serif" font-size="14" font-weight="500" fill="#3D3D3A">Robotics iteration</text>
<text x="640" y="170" text-anchor="end" font-family="sans-serif" font-size="12" fill="#5F5E5A">Days to weeks</text>
<rect x="40" y="190" width="80" height="40" rx="6" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="80" y="210" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" fill="#712B13">Code</text>
<line x1="122" y1="210" x2="142" y2="210" stroke="#5F5E5A" stroke-width="1.5" marker-end="url(#arrow)"/>
<rect x="144" y="190" width="80" height="40" rx="6" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="184" y="210" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" fill="#712B13">Simulate</text>
<line x1="226" y1="210" x2="246" y2="210" stroke="#5F5E5A" stroke-width="1.5" marker-end="url(#arrow)"/>
<rect x="248" y="190" width="80" height="40" rx="6" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="288" y="210" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" fill="#712B13">HIL test</text>
<line x1="330" y1="210" x2="350" y2="210" stroke="#5F5E5A" stroke-width="1.5" marker-end="url(#arrow)"/>
<rect x="352" y="190" width="80" height="40" rx="6" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="392" y="210" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" fill="#712B13">OTA fleet</text>
<line x1="434" y1="210" x2="454" y2="210" stroke="#5F5E5A" stroke-width="1.5" marker-end="url(#arrow)"/>
<rect x="456" y="190" width="80" height="40" rx="6" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="496" y="210" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" fill="#712B13">Field</text>
<line x1="538" y1="210" x2="558" y2="210" stroke="#5F5E5A" stroke-width="1.5" marker-end="url(#arrow)"/>
<rect x="560" y="190" width="80" height="40" rx="6" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="600" y="210" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" fill="#712B13">Recover</text>
</svg>

**"Move fast and break things" stops being a metaphor.** Things with wheels, motors, and inertia can break themselves, the customer's property, or a person. There is no robotics equivalent of `git revert`. Once a heavy machine has rolled into a flowerbed, the flowerbed is in the bug report. This forces a culture of pre-flight checks, simulation gates, and conservative defaults that feels slow until the day it saves you from a lawsuit.

**Beta is a more dangerous word.** A beta SaaS product can lose data, crash, embarrass the user. A beta robot can hurt someone. The implicit contract of "early access, things will be janky" doesn't survive contact with physical risk. We had to be much more careful about what "early customer" meant. For the lawnmower, an early customer was someone whose site we'd scouted, whose expectations we'd carefully managed, and whose installation we'd personally supervised. That's a very different motion from clicking "join the beta."

**The customer's environment is part of the product surface.** This is the one nobody warned me about. A SaaS product's environment is a browser. A robot's environment is a lawn with three slopes, a tree the GPS doesn't quite see, a fence with a gap the kid leaves open, and a customer who likes to leave the hose stretched across the path. Or, on an automotive plant floor: lighting that changes every shift, a forklift driver who parks in the docking lane, a roll cage that arrives 20 cm off-spec. Every one of those is now in scope. Your operating envelope isn't defined by your code; it's defined by the intersection of your code and the messiest version of your customer's site.

**Demos are nearly worthless as predictors.** A demo proves the robot can do the thing once, in a place you've controlled. A product is the robot doing the thing reliably, in a place the customer controls, while you sleep. The gap between those is enormous, and it's where most early robotics companies die. The site acceptance test (SAT) is where that gap gets measured. By the time we delivered an autonomous forklift to a Fortune 500 plant, every fault mode, recovery sequence, and emergency stop had been signed off on the customer's actual floor, at production tempo, for two automated shifts. A demo on a clean test pad tells you nothing about a robot doing 14 trips per hour for 16 hours a day under real safety constraints.

**"Support" is not a cost center, it's a product feature.** When a SaaS user is stuck, they file a ticket and wait. When a robot is stuck, the customer's production line doesn't move today, and they're standing next to an expensive paperweight feeling stupid. Your remote diagnostics, your teleop fallback, your "phone the robot home for help" flow: these aren't ops infrastructure. They are part of how the product feels to own. Skimp on them and your NPS will quietly bleed out.

## The customer-readiness problem

If I had to pick the single biggest gap between SaaS and robotics 0→1, it would be this: in SaaS, the customer is usually ready to use the product the moment they sign up. In robotics, the customer is rarely ready, and figuring out how to make them ready, without turning the sales cycle into a six-month consulting engagement, is most of the job.

I learned this slowly across two product launches and 10+ customer cities. Then I learned it again, faster and more expensively, deploying autonomous forklifts at three Fortune 500 plants in a single year, in three different industries and three different countries. Different scales, different stakes, but the same four kinds of gap show up every time.

<svg width="100%" viewBox="0 0 680 300" role="img" xmlns="http://www.w3.org/2000/svg">
<title>The four kinds of customer readiness in robotics</title>
<desc>Site readiness, operator readiness, expectation readiness, and recovery readiness. Each must be addressed for a robot to actually work in production.</desc>
<rect x="40" y="30" width="290" height="110" rx="10" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
<text x="60" y="70" font-family="sans-serif" font-size="14" font-weight="500" fill="#3C3489">Site readiness</text>
<text x="60" y="96" font-family="sans-serif" font-size="12" fill="#534AB7">Will the environment work?</text>
<rect x="350" y="30" width="290" height="110" rx="10" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
<text x="370" y="70" font-family="sans-serif" font-size="14" font-weight="500" fill="#3C3489">Operator readiness</text>
<text x="370" y="96" font-family="sans-serif" font-size="12" fill="#534AB7">Who handles the unexpected?</text>
<rect x="40" y="160" width="290" height="110" rx="10" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
<text x="60" y="200" font-family="sans-serif" font-size="14" font-weight="500" fill="#3C3489">Expectation readiness</text>
<text x="60" y="226" font-family="sans-serif" font-size="12" fill="#534AB7">What does autonomous mean?</text>
<rect x="350" y="160" width="290" height="110" rx="10" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
<text x="370" y="200" font-family="sans-serif" font-size="14" font-weight="500" fill="#3C3489">Recovery readiness</text>
<text x="370" y="226" font-family="sans-serif" font-size="12" fill="#534AB7">What when something breaks?</text>
</svg>

**Site readiness.** Does the physical environment actually support the robot? For the mower, that meant boundary mapping, GPS sky-view, slope checks, obstacle audits. For the forklift, it meant lane widths, dock heights, lighting consistency, network coverage in concrete-walled corners, and integration with the existing safety perimeter. Skipping a proper site survey to close a sale faster is the most expensive trade you can make in this business; the cost just shows up later, as a churn or a refund or a unit you have to fly back. A 15-day deployment of two production-ready forklifts at a heavy-equipment plant only worked because the survey was airtight before the first commit.

**Operator readiness.** Someone on the customer's side has to know what to do when the robot does something unexpected. They don't need to be a roboticist, but they need a mental model. If you can't explain the failure modes in language a non-technical operator can act on, you're going to get 2 a.m. calls. Treat operator training as part of installation, not as documentation you email afterwards. On every Fortune 500 deployment I've run, the customer's shift supervisor had hands-on time with our pendant before the robot ever ran live.

**Expectation readiness.** What does "autonomous" mean to this customer? Most of the time, the customer hears the word and pattern-matches to a sci-fi mental model where the robot figures everything out. Setting honest expectations about the operating envelope, the recovery process, and the role of human-in-the-loop is something you have to do explicitly and repeatedly, ideally before the contract is signed. The customers who churn are usually the ones whose expectations were never reset.

**Recovery readiness.** When (not if) something goes wrong, a stuck robot, a misbehaving sensor, a network outage during an update, what's the playbook? Who calls whom? How fast can you teleoperate in? Can you get a replacement unit on a truck within 24 hours? These are usually thought of as ops problems and solved last. They should be designed first.

## What I'd actually do differently

If I were starting a robotics 0→1 today, here's what I'd front-load that I didn't front-load enough the first two times.

Make the site survey a first-class artifact, not an afterthought. Build a structured checklist, take it seriously, and refuse to install when the site fails it. Yes, this slows down sales. It also slows down churn, which is a much more expensive form of slow.

Define the operating envelope brutally and publish it. Slopes up to X degrees, GPS visibility above Y, temperatures between A and B, obstacles larger than Z must be marked. Customers respect honesty about limits more than they respect optimism. And it gives your engineers a clean target to harden against.

Hold the line on standardization. The hardest call I've made was holding a tier-1 construction customer to three standard payload trims when their procurement team wanted bespoke. The bespoke trim would have closed the deal in week 2. The three standard trims kept us shippable in week 12, and across the next ten customers after that. Bespoke doesn't scale; standardization is product, customization is consulting. Say no early.

Build the unhappy paths first, or at least early. The day-1 demo is the happy path. The day-180 retention is the unhappy path. Recovery, teleop, fault diagnosis, and remote intervention should not be v2 features. They are v1 features, dressed in different clothes.

Treat telemetry as non-negotiable from the very first deployed unit. You cannot debug a robot you cannot see. Every sensor stream, every plan, every failure mode should be retrievable after the fact. The first time you have to ask a customer "can you describe what the robot did?" should also be the last.

Assume the teleoperator is part of v1. For most autonomy products, full autonomy is a destination, not a starting point. Plan for a human in the loop, remote, on-call, well-tooled, and design the product around that being normal, not embarrassing. The companies that pretend they're more autonomous than they are tend to ship worse products than the ones that admit they aren't.

Keep a decision log. Most of what kills 0→1 robotics companies isn't the technical bug; it's the decision that should have been made in week 1 and was instead deferred until week 12. Write down what you decided, why, and what you're explicitly choosing not to do. The hardest decisions to defend later are the ones you never wrote down.

<svg width="100%" viewBox="0 0 680 270" role="img" xmlns="http://www.w3.org/2000/svg">
<title>A decision log entry</title>
<desc>Sample decision log entry with five fields: date, decision, why, what's explicitly not being done, and owner. Used to record key product tradeoffs so they can be defended later.</desc>
<rect x="40" y="30" width="600" height="220" rx="12" fill="#FBEAF0" stroke="#993556" stroke-width="0.5"/>
<text x="60" y="62" font-family="sans-serif" font-size="11" font-weight="500" fill="#72243E">Decision log · entry 23</text>
<text x="60" y="100" font-family="sans-serif" font-size="12" fill="#993556">Date</text>
<text x="180" y="100" font-family="sans-serif" font-size="12" fill="#3D3D3A">2024 Q1</text>
<text x="60" y="130" font-family="sans-serif" font-size="12" fill="#993556">Decision</text>
<text x="180" y="130" font-family="sans-serif" font-size="14" font-weight="500" fill="#3D3D3A">Hold to 3 standard payload trims</text>
<text x="60" y="162" font-family="sans-serif" font-size="12" fill="#993556">Why</text>
<text x="180" y="162" font-family="sans-serif" font-size="12" fill="#3D3D3A">Bespoke trims don't scale. Three standard trims keep us</text>
<text x="180" y="180" font-family="sans-serif" font-size="12" fill="#3D3D3A">shippable across the next ten customers.</text>
<text x="60" y="210" font-family="sans-serif" font-size="12" fill="#993556">Not doing</text>
<text x="180" y="210" font-family="sans-serif" font-size="12" fill="#3D3D3A">Custom trim work for any single customer.</text>
<text x="60" y="234" font-family="sans-serif" font-size="12" fill="#993556">Owner</text>
<text x="180" y="234" font-family="sans-serif" font-size="12" fill="#3D3D3A">Product</text>
</svg>

And respect the cost of iteration. You don't get to ship and learn at SaaS speeds. You learn instead through simulation, through hardware-in-the-loop, through staged rollouts to a few customers who actually want to be partners. The teams that win are the ones that build the simulation and rollout infrastructure as a first-class part of the product, not as a side project squeezed in between sprints.

## Closing

The thing nobody tells you about robotics 0→1 is that you're not really shipping a robot. You're shipping a small, weird operations company that happens to include a robot. The hardware is the most visible part, but the actual playbook lives in the survey, the install, the SAT, the telemetry, the teleop, and the support muscle around it.

The SaaS playbook gets you about forty percent of the way there. The other sixty is figuring out, slowly, painfully, and usually in production, that the customer's environment is your real codebase, and customer-readiness is the real loading screen.

If you're thinking about going 0→1 on a robot right now, my one piece of advice would be: spend at least as much time on the customer-readiness side of the product as you do on the autonomy side. The robot is the easy part. Everything around it is where the company actually lives.
