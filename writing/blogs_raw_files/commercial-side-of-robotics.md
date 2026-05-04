# Pilots, Pricing, and the ROI Deck

*Notes on the commercial side of robotics 0→1: why pilots stall, how pricing changes the company, and the slide a CFO will actually sign.*

Most robotics writing, including my last post, focuses on the technical and operational side: how to ship the robot, how to handle the customer's environment, how to design for recovery. That's the part founders and engineers love to talk about.

The part nobody writes about, and the part that quietly kills more robotics companies than any sensor calibration ever did, is the commercial side. Specifically: why pilots stall, how to price autonomy without scaring the procurement team, and what an industrial buyer's ROI deck actually needs to say.

I've watched this play out across two product launches and a string of Fortune 500 deployments. The pattern is consistent enough that it deserves its own essay. Here's what I've learned, and what I'd tell a robotics PM who's about to spend 18 months in pilot purgatory.

## Pilot purgatory

Almost every robotics company you talk to is stuck in the same place. They've completed pilots, sometimes several, and they don't have a real commercial PO. Not a follow-on pilot, not an extension. A purchase order, with capital approval, on the customer's standard procurement paper.

If you actually count the funnel, it looks something like this.

<svg width="100%" viewBox="0 0 680 280" role="img" xmlns="http://www.w3.org/2000/svg">
<title>The pilot-to-PO cliff in robotics commercial conversion</title>
<desc>Out of every 100 demos, roughly 40 pilots get signed, 30 complete successfully, but only 8 turn into a first commercial purchase order, and only 3 scale to 5+ units. The drop between a completed pilot and a first PO is where most robotics companies stall.</desc>
<text x="40" y="28" font-family="sans-serif" font-size="11" font-weight="500" fill="#5F5E5A">Stage</text>
<text x="220" y="28" font-family="sans-serif" font-size="11" font-weight="500" fill="#5F5E5A">% of initial demos that get here</text>
<text x="40" y="55" font-family="sans-serif" font-size="13" fill="#3D3D3A">Demo accepted</text>
<rect x="220" y="42" width="400" height="22" rx="3" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="630" y="55" font-family="sans-serif" font-size="13" font-weight="500" fill="#085041">100%</text>
<text x="40" y="90" font-family="sans-serif" font-size="13" fill="#3D3D3A">Pilot signed</text>
<rect x="220" y="77" width="160" height="22" rx="3" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="390" y="90" font-family="sans-serif" font-size="13" font-weight="500" fill="#085041">40%</text>
<text x="40" y="125" font-family="sans-serif" font-size="13" fill="#3D3D3A">Pilot completed</text>
<rect x="220" y="112" width="120" height="22" rx="3" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="350" y="125" font-family="sans-serif" font-size="13" font-weight="500" fill="#085041">30%</text>
<text x="340" y="165" text-anchor="middle" font-family="sans-serif" font-size="12" font-style="italic" fill="#993C1D">pilot purgatory · 22-point drop · where most companies stall</text>
<text x="40" y="200" font-family="sans-serif" font-size="13" fill="#3D3D3A">First commercial PO</text>
<rect x="220" y="187" width="32" height="22" rx="3" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="262" y="200" font-family="sans-serif" font-size="13" font-weight="500" fill="#712B13">8%</text>
<text x="40" y="235" font-family="sans-serif" font-size="13" fill="#3D3D3A">Scale to 5+ units</text>
<rect x="220" y="222" width="12" height="22" rx="3" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="242" y="235" font-family="sans-serif" font-size="13" font-weight="500" fill="#712B13">3%</text>
</svg>

You demo to a hundred buyers and forty sign a paid pilot. Thirty of those pilots complete successfully on the technical metrics you agreed to. But of those thirty, only about eight turn into a first commercial PO, and three scale to five or more units. The drop between "pilot completed successfully" and "first PO" is the cliff. It's where most companies live, and many die.

Why does this happen? Mostly because the pilot proved the wrong things.

A "successful" pilot, as commonly run, proves that the robot can do the task in a friendly bay, during a friendly champion's tenure, on a curated product mix, at light volume. That is not nothing. It is also much, much less than what the customer's commercial buying process actually requires.

<svg width="100%" viewBox="0 0 680 360" role="img" xmlns="http://www.w3.org/2000/svg">
<title>What pilots claim to prove versus what they actually prove</title>
<desc>Four common claims about successful pilots, paired with what those pilots actually prove. Pilots claim the robot works, FTE savings, customer happiness, and 90-day success; in reality they prove only narrow conditions.</desc>
<text x="180" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="500" fill="#712B13">What we tell the board</text>
<text x="500" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="500" fill="#085041">What it actually proves</text>
<rect x="40" y="60" width="280" height="60" rx="8" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="180" y="95" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="500" fill="#712B13">The robot works.</text>
<rect x="360" y="60" width="280" height="60" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="500" y="85" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">The robot works on this product mix,</text>
<text x="500" y="103" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">with this team, on this shift schedule.</text>
<rect x="40" y="135" width="280" height="60" rx="8" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="180" y="170" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="500" fill="#712B13">We saved 1.2 FTE.</text>
<rect x="360" y="135" width="280" height="60" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="500" y="160" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">Net 0.5 FTE after teleop and</text>
<text x="500" y="178" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">maintenance overhead.</text>
<rect x="40" y="210" width="280" height="60" rx="8" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="180" y="245" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="500" fill="#712B13">The customer is happy.</text>
<rect x="360" y="210" width="280" height="60" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="500" y="235" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">The innovation team is happy.</text>
<text x="500" y="253" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">Procurement hasn't run TCO yet.</text>
<rect x="40" y="285" width="280" height="60" rx="8" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
<text x="180" y="320" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="500" fill="#712B13">Successful 90-day pilot.</text>
<rect x="360" y="285" width="280" height="60" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="500" y="310" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">90 days at light volume during</text>
<text x="500" y="328" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">a friendly champion's tenure.</text>
</svg>

When the pilot ends and the conversation shifts to "let's place a real order," a different group of people walks into the room. The innovation team, the friendly champions who ran the pilot, hand the conversation off to procurement, finance, plant operations, and EH&S. None of those people were in the pilot. None of them care about the technical metrics. They care about TCO, payback period, what breaks at scale, what the labor agreement says about robots, who carries the liability, and whether this slots into next year's capex plan or has to wait for the year after.

The innovation team can sponsor a pilot. They cannot, in most large industrial companies, sponsor a fleet rollout. The buyer changes between the pilot and the PO, and the new buyer needs a different proof.

What a pilot actually has to prove, if you want a PO at the end:

**TCO at scale, not unit cost.** The customer doesn't care that one robot is profitable. They care what 20 of them cost to run, including the integration, the training, the spares, the network upgrade, and the teleop.

**Behavior across product mix.** A pilot run on three SKUs doesn't predict behavior on thirty. If your customer's plant does mix changes at quarter-end, your pilot has to survive a quarter-end.

**Performance under operational stress.** A four-hour shift demo doesn't predict a sixteen-hour shift over six months. Holidays, headcount changes, equipment swaps: those are the stress tests.

**Buy-in from someone who is not the champion.** If the only person who will defend your robot in the procurement committee is the innovation team's director, your odds are bad. Build the relationship with the plant manager and the operations VP early.

**A clean handover plan.** The customer needs to know, on paper, what their team will own and what your team will own after install. If they have to call you every time the robot stops, that's not a product. That's a consulting engagement they're paying for as a product.

Pilots in robotics shouldn't be technical demonstrations dressed up as commercial milestones. They should be commercial dress rehearsals dressed up as technical demonstrations. The technical work is the floor. The commercial proof is the ceiling.

## RaaS vs CapEx

The single most underwritten lever a robotics PM has is pricing.

You can, broadly, sell autonomy two ways. CapEx: the customer buys the robot, depreciates it over five to seven years, owns the asset and the risk. RaaS, robotics as a service: the customer pays a monthly fee, often bundled with support and uptime guarantees, and you keep the asset on your books.

Most founders treat this as a billing detail. It isn't. It's one of the few decisions that changes the customer profile, the deployment model, your cash position, and what features you build, all at once.

<svg width="100%" viewBox="0 0 680 340" role="img" xmlns="http://www.w3.org/2000/svg">
<title>RaaS versus CapEx: how pricing changes the company</title>
<desc>Comparison across four dimensions: how the customer pays, accounting treatment, approval cycle, and what infrastructure the vendor must build to support each model.</desc>
<rect x="40" y="20" width="240" height="40" rx="6" fill="#E6F1FB" stroke="#185FA5" stroke-width="0.5"/>
<text x="160" y="40" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" font-weight="500" fill="#0C447C">RaaS</text>
<rect x="400" y="20" width="240" height="40" rx="6" fill="#FAEEDA" stroke="#854F0B" stroke-width="0.5"/>
<text x="520" y="40" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" font-weight="500" fill="#633806">CapEx</text>
<text x="340" y="95" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="500" fill="#5F5E5A">Customer pays</text>
<text x="160" y="115" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#0C447C">$X / month</text>
<text x="520" y="115" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#633806">$Y upfront</text>
<text x="340" y="160" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="500" fill="#5F5E5A">Accounting</text>
<text x="160" y="180" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#0C447C">OpEx</text>
<text x="520" y="180" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#633806">CapEx, 5-7 yr depreciation</text>
<text x="340" y="225" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="500" fill="#5F5E5A">Approval cycle</text>
<text x="160" y="245" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#0C447C">Plant manager budget</text>
<text x="520" y="245" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#633806">Capital committee · 12-18 months</text>
<text x="340" y="285" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="500" fill="#5F5E5A">You must build</text>
<text x="160" y="305" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#0C447C">Fleet ops, refurb,</text>
<text x="160" y="320" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#0C447C">redeployment infra</text>
<text x="520" y="305" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#633806">Sales, install, training,</text>
<text x="520" y="320" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#633806">spare-parts logistics</text>
</svg>

Start with the customer. A plant manager who is risk-averse on autonomy, and they all are, sensibly, finds CapEx terrifying for an unproven product. Buying a $240k robot they're not sure will still be useful in three years means defending that purchase to a capital committee that doesn't want to hear about it. RaaS, in contrast, often slides through as plant-level OpEx without the same approval cycle, because cancelling a subscription is reversible in a way that buying a depreciating asset is not.

That same dynamic flips at scale. A plant that has decided robots work, and is committed to a fleet, often prefers CapEx. They want the asset on their books. They've stopped seeing it as a risk and started seeing it as infrastructure. The monthly fee starts to feel like rent on something they should own.

Now flip to your side. RaaS makes you a fleet operator. You hold the hardware on your balance sheet, you carry the redeployment risk when a customer cancels, you fund maintenance and refurb out of recurring revenue. To survive that model you need genuinely excellent fleet ops, telemetry, and support infrastructure. You also need a balance sheet that can absorb the float, which for most early-stage robotics companies means raising more money. CapEx, by contrast, makes you a hardware company. You sell, install, and walk away with cash. The customer's pain becomes your support burden, but your unit economics are simpler and your cash conversion is faster.

Pricing also changes what features matter. RaaS punishes downtime hard, because the customer can churn next quarter. So a RaaS-priced product needs aggressive uptime monitoring, fast remote intervention, and rollover spares as a default. CapEx punishes underdocumentation hard, because the customer's ops team has to learn the robot, and you don't have a recurring relationship to fall back on. So a CapEx-priced product needs serious documentation, training programs, and a spare-parts pipeline that survives without you on the phone.

Most early-stage robotics companies should start with RaaS, even though it's harder on the balance sheet, for two reasons. It lowers the buying friction at exactly the moment when buying friction is the bottleneck. And it forces you to build the support infrastructure your CapEx version will eventually need anyway.

But pick deliberately. The biggest mistake is treating pricing as a default rather than a design choice. Both models work. Choosing wrong for your stage costs you a lot more than the price tag suggests.

## The ROI deck the plant manager actually reads

When the conversation moves from pilot to PO, you will be asked, often with awkward suddenness, for "the business case." Whatever you send is going to land on the plant manager's desk and, eventually, on the CFO's. If you send what most robotics PMs send, a deck full of features, demo videos, and "AI-powered" language, they're going to be polite, and they're going to say no.

Industrial buyers reason differently from SaaS buyers, in ways that catch most PMs off guard.

A SaaS buyer thinks per-seat, expects fast trials, makes a low-risk decision, and measures ROI in soft terms like "team productivity." An industrial buyer thinks per-unit, expects long trials, makes a high-risk capital decision, and measures ROI in hard dollars. They are accountable to a CFO who will read their slide and ask: what's the payback? And then: what breaks this number?

The slide that gets signed looks something like this.

<svg width="100%" viewBox="0 0 680 270" role="img" xmlns="http://www.w3.org/2000/svg">
<title>ROI summary the plant manager actually reads</title>
<desc>One-page ROI summary covering per-unit cost in both pricing models, annual labor savings, payback period in months, three-year NPV, and the key sensitivity that breaks the case.</desc>
<rect x="40" y="30" width="600" height="220" rx="12" fill="#FBEAF0" stroke="#993556" stroke-width="0.5"/>
<text x="60" y="62" font-family="sans-serif" font-size="11" font-weight="500" fill="#72243E">ROI summary · material movement program · 1 unit</text>
<text x="60" y="100" font-family="sans-serif" font-size="12" fill="#993556">Per-unit cost</text>
<text x="220" y="100" font-family="sans-serif" font-size="12" fill="#3D3D3A">$240k CapEx, or ~$8k / month RaaS</text>
<text x="60" y="130" font-family="sans-serif" font-size="12" fill="#993556">Annual savings</text>
<text x="220" y="130" font-family="sans-serif" font-size="14" font-weight="500" fill="#3D3D3A">1.4 FTE × $50k loaded = $70k / year</text>
<text x="60" y="162" font-family="sans-serif" font-size="12" fill="#993556">Payback period</text>
<text x="220" y="162" font-family="sans-serif" font-size="14" font-weight="500" fill="#3D3D3A">14 months</text>
<text x="60" y="195" font-family="sans-serif" font-size="12" fill="#993556">3-year NPV</text>
<text x="220" y="195" font-family="sans-serif" font-size="12" fill="#3D3D3A">$350k @ 10% discount rate</text>
<text x="60" y="228" font-family="sans-serif" font-size="12" fill="#993556">Breaks if</text>
<text x="220" y="228" font-family="sans-serif" font-size="12" fill="#3D3D3A">Loaded labor cost falls below ~$42k / FTE</text>
</svg>

That's the whole pitch. Five fields, no marketing language, no "our breakthrough AI," no slide of robot photos. Cost, savings, payback, NPV, and the sensitivity that breaks the case. A CFO can decide on that page in two minutes.

A few things worth saying about each line.

**Per-unit cost** should be honest about both pricing models. Plant managers who can't get capital approval will look at the RaaS column. Plant managers with capital budgets will look at the CapEx column. Both belong on the slide.

**Annual savings** need to be FTE-denominated, fully loaded, and defensible. "Fully loaded" means salary plus benefits plus turnover plus training, usually 1.3 to 1.5x base. If you say a unit replaces 1.4 FTE, you'd better be able to show which 1.4 (what shifts, what tasks, what overtime) or operations will tear the number apart.

**Payback period** in months, not years, is what gets attention. Single-digit-month payback is an easy sale. 12 to 24 months is normal. Anything over 36 needs either a really good story or a really patient customer.

**NPV** is for the CFO. Most plant managers don't compute it themselves; they care about payback. But the CFO will, and a clean NPV with the discount rate stated saves a round of questions.

**The "breaks if" line** is the one most PMs skip, and it's the one that builds the most trust. Industrial buyers know your model has assumptions. Showing the sensitivity, "this case breaks if loaded labor cost falls below $42k/FTE," tells them you've actually thought about it. That single sentence has closed deals for me.

Build that slide before you build the deck. If you can't fill in those five lines for your product on a real customer's data, you don't have a business case yet. You have an aspiration.

## Closing

The thing nobody tells you about robotics 0→1, on the commercial side, is that you are not selling a robot. You are selling a financial model. The robot is what makes the financial model real, but the model is what gets bought.

The pilots that succeed are the ones designed to validate the financial model, not just the technical one. The pricing that works is the pricing that makes the model approvable inside the customer's actual procurement process. The ROI deck that gets signed is the one that hands the CFO a defensible case in five lines.

If you're a robotics PM staring down pilot purgatory: stop sending more demo videos. Build the model. Validate it on the pilot. Pick the pricing that fits the buyer. And give the CFO the slide they actually need.

The robot is the easy part. The slide is where the company actually closes.
