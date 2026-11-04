# cert-cards

Minimal flashcard decks for IT certifications, served as a static GitHub Pages site. Public sources only; summaries are written in my own words and link to the exact source section.

Decks: Security+ (SY0-701, all 5 domains), AWS Solutions Architect Associate (SAA-C03, 100 cards), CCNA (200-301 v1.1, 123 cards).

## Controls
- Tap right half: next card. Tap left half: previous card.
- Hold: show the back (summary + source link), release to return. To open the source, hold, slide onto the link, and release.
- Top circle: switch deck.
- Desktop: arrow keys to move, hold Space to flip.

## Adding a deck
Add an entry to `decks/index.json` and a JSON array of cards:
`{ "id", "obj", "front", "back", "src": { "title", "url" } }`
Use `#:~:text=` text fragments in `url` to land on the exact paragraph.

Run locally with `python3 -m http.server` (fetch needs http, not file://).

## Checking sources
`python3 tools/check_links.py` confirms every card's source loads and still contains the quoted passage (`src.q`). PDF sources link to `#page=N`; the check needs `pdftotext`.

## Security+ Domain 1 gaps (no verified public source yet)
Deterrent and directive control types, gap analysis, access control vestibule/bollards/fencing/lighting, adaptive identity, backout plan, maintenance window, SOPs, downtime/restarts, legacy apps, dependencies, version control.

## Security+ Domain 2 gaps (no verified public source yet)
Named actor types (hacktivist, organized crime, unskilled attacker), shadow IT, motivations, BEC/typosquatting/pretexting/vishing/smishing, VM escape, memory injection, malicious update, segmentation, impossible travel and other log indicators, EDR, decommissioning, DNS/wireless/physical attacks, cryptographic attacks.

## Security+ Domain 3 gaps (no verified public source yet)
IaC, microservices, serverless, RTOS/embedded, responsibility matrix, NGFW/WAF/UTM, load balancer, 802.1X port security, SASE/SD-WAN, device placement and failure modes, data classification levels and sovereignty, platform diversity, multi-cloud, capacity planning, backup types and replication, generators.

## Security+ Domain 4 gaps (no verified public source yet)
Secure baselines and wireless security (WPA3), asset inventory/tracking, data retention, OSINT, penetration testing, responsible disclosure, prioritization and exposure factor, NetFlow, SOAR and automation/orchestration, FIM, EDR/XDR, UEBA, ACLs, web and DNS filtering, PAM, provisioning/deprovisioning, password concepts, legal hold and e-discovery, threat hunting, order of volatility.

## Security+ Domain 5 gaps (no verified public source yet)
Governance structures and external regulations (named laws/standards), policy vs standard vs procedure, MTBF/MTTR, risk exemptions, right to audit, vendor due diligence and questionnaires, BPA/WO, compliance consequences and reporting, attestation, passive/active reconnaissance, user guidance topics (insider threat, password management, operational security), awareness effectiveness metrics.

## AWS SAA-C03 deck
Objectives follow the official exam guide task statements (1.1 to 4.4). `Obj 4.0` marks cost-governance tools that span tasks. Sources are AWS documentation pages; `python3 tools/check_links.py decks/aws-saa.json` verifies them.

### Gaps so far
IAM least-privilege best practice, VPN, Redshift, QuickSight, Snow family, Storage Gateway, cost allocation tags, ALB vs NLB differences, data transfer pricing, Lambda concurrency, EventBridge/Step Functions details, S3 Glacier retrieval tiers.

## CCNA 200-301 v1.1 deck
Objectives follow the official exam topics (1.1 to 6.7). Cisco's own documentation blocks scripted fetches, so sources are RFCs and Wikipedia, which the checker can verify; `python3 tools/check_links.py decks/ccna.json` confirms every quote. The NSA Computer Networking Test prep guide was used as a topic cross-check (TCP handshake, administrative distances).

### Gaps (no verified public source yet)
Cisco IOS command syntax for any "configure and verify" objective, PoE standards, endpoints and servers, spine-leaf, SOHO and on-premises vs cloud, IPv4 subnetting worked examples, IPv6 EUI-64 calculation, client OS IP verification commands, inter-VLAN routing (router-on-a-stick, SVI), voice VLANs, root/loop/BPDU guard, wireless architectures and AP modes, WLAN GUI configuration, GLBP, DHCP/DNS operation details beyond the basics, security program elements, password policy, most AI/ML in network operations, CRUD verbs and REST auth types.
