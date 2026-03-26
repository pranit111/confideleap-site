"""Seed Sanity CMS with clients from confideleap.com/clients/"""
import json, urllib.request, urllib.error

TOKEN   = "skEUtvwmIMhS5NyxLDkW9S6gB8W4zuf1Q33GocKepDzkq1xhX8qlwAlDdN6d7Ixe4YQDw8d5twhMawark"
PROJECT = "zcprlk2a"
DATASET = "production"
URL     = f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/mutate/{DATASET}"

def slug(val):
    return {"_type": "slug", "current": val}

CLIENTS = [
    {
        "_id": "client-stallion-india",
        "_type": "client",
        "name": "Stallion India Fluorochemicals Ltd.",
        "slug": slug("stallion-india-fluorochemicals"),
        "industry": "Chemicals",
        "description": "Stallion India Fluorochemicals is a leading player in the debulking, blending, and processing of refrigerant and industrial gases. The company serves a wide range of end-use industries including automotive, HVAC, and industrial manufacturing, with a strong focus on quality and regulatory compliance.",
        "website": "https://www.stallionindiafl.com",
        "featured": True,
        "services": ["Investor Relations", "Digital Marketing"],
        "testimonial": {
            "quote": "ConfideLeap's investor relations advisory has been instrumental in helping us communicate our growth story to capital markets with clarity and confidence.",
            "personName": "Management Team",
            "personRole": "Stallion India Fluorochemicals Ltd."
        },
        "order": 1,
    },
    {
        "_id": "client-trishakti-industries",
        "_type": "client",
        "name": "Trishakti Industries Ltd",
        "slug": slug("trishakti-industries"),
        "industry": "Infrastructure",
        "description": "Trishakti Industries is a specialist heavy equipment hiring and infrastructure services provider, serving major construction and infrastructure projects across India. The company provides cranes, heavy lifting, and allied services to EPC contractors and project developers.",
        "website": "https://www.trishaktiindustries.com",
        "featured": False,
        "services": ["Investor Relations", "Public Relations"],
        "testimonial": {
            "quote": "The strategic PR and IR advisory from ConfideLeap helped us build a stronger presence in the investment community at a critical stage of our growth.",
            "personName": "Management Team",
            "personRole": "Trishakti Industries Ltd"
        },
        "order": 2,
    },
    {
        "_id": "client-anlon-healthcare",
        "_type": "client",
        "name": "Anlon Healthcare Ltd",
        "slug": slug("anlon-healthcare"),
        "industry": "Pharmaceuticals",
        "description": "Anlon Healthcare is a research-driven manufacturer of pharmaceutical intermediates and active pharmaceutical ingredients (APIs). The company operates state-of-the-art manufacturing facilities and serves both domestic and international markets with a strong emphasis on quality, compliance, and innovation.",
        "website": "https://www.anlonhealthcare.com",
        "featured": True,
        "services": ["Investor Relations", "Annual Report", "Digital Marketing"],
        "testimonial": {
            "quote": "ConfideLeap transformed our investor communications. Their deep understanding of the pharma sector helped us articulate our R&D pipeline and growth strategy with real conviction.",
            "personName": "Management Team",
            "personRole": "Anlon Healthcare Ltd"
        },
        "order": 3,
    },
    {
        "_id": "client-rishi-laser",
        "_type": "client",
        "name": "Rishi Laser Ltd",
        "slug": slug("rishi-laser"),
        "industry": "Manufacturing",
        "description": "Rishi Laser is a precision sheet metal fabrication company that manufactures components and machinery for diverse industrial applications. The company employs advanced laser cutting, bending, and welding technologies, serving sectors including defence, automotive, telecom, and infrastructure.",
        "website": "https://www.rishilaser.com",
        "featured": False,
        "services": ["Investor Relations", "Public Relations"],
        "testimonial": {
            "quote": "Working with ConfideLeap gave us a professional investor relations framework that we never had before. The results in terms of analyst engagement were immediate.",
            "personName": "Management Team",
            "personRole": "Rishi Laser Ltd"
        },
        "order": 4,
    },
    {
        "_id": "client-kings-infra",
        "_type": "client",
        "name": "Kings Infra Ventures Limited",
        "slug": slug("kings-infra-ventures"),
        "industry": "Aquaculture",
        "description": "Kings Infra Ventures is an integrated aquaculture and seafood export company that combines technology-driven farming practices with a robust export network. The company supplies premium seafood to international markets and is focused on sustainable aquaculture development in India.",
        "website": "https://www.kingsinfra.com",
        "featured": True,
        "services": ["Investor Relations", "Digital Marketing", "Annual Report"],
        "testimonial": {
            "quote": "ConfideLeap helped us position Kings Infra's unique aquaculture story effectively to institutional investors. Their advisory was professional, thorough, and genuinely impactful.",
            "personName": "Management Team",
            "personRole": "Kings Infra Ventures Limited"
        },
        "order": 5,
    },
    {
        "_id": "client-namo-ewaste",
        "_type": "client",
        "name": "Namo eWaste Management Limited",
        "slug": slug("namo-ewaste-management"),
        "industry": "Environment",
        "description": "Namo eWaste Management is a leading e-waste recycling company providing end-to-end Extended Producer Responsibility (EPR) consulting and certified recycling services. The company helps corporates and producers meet their statutory EPR obligations while enabling sustainable e-waste disposal at scale.",
        "website": "https://www.namoewaste.com",
        "featured": True,
        "services": ["Investor Relations", "Public Relations", "Digital Marketing"],
        "testimonial": {
            "quote": "Our engagement with ConfideLeap elevated our investor and media communications significantly. They understood the ESG angle of our business and helped us tell that story powerfully.",
            "personName": "Management Team",
            "personRole": "Namo eWaste Management Limited"
        },
        "order": 6,
    },
    {
        "_id": "client-australian-premium-solar",
        "_type": "client",
        "name": "Australian Premium Solar (India) Ltd",
        "slug": slug("australian-premium-solar"),
        "industry": "Renewable Energy",
        "description": "Australian Premium Solar (India) is a clean energy company engaged in the manufacture of high-efficiency solar modules, EPC project execution, and smart solar product development. The company serves rooftop, utility, and commercial segments with a commitment to quality and long-term energy savings.",
        "website": "https://www.australianpremiumsolar.com",
        "featured": True,
        "services": ["Investor Relations", "Digital Marketing", "Annual Report"],
        "testimonial": {
            "quote": "ConfideLeap brought structure and sophistication to our investor relations. The way they positioned our renewable energy story to the market was exactly what we needed.",
            "personName": "Management Team",
            "personRole": "Australian Premium Solar (India) Ltd"
        },
        "order": 7,
    },
    {
        "_id": "client-aztec-fluids",
        "_type": "client",
        "name": "Aztec Fluids & Machinery Limited",
        "slug": slug("aztec-fluids-machinery"),
        "industry": "Manufacturing",
        "description": "Aztec Fluids & Machinery is a specialised provider of coding and marking solutions for product identification and packaging applications across FMCG, pharma, food processing, and industrial sectors. The company offers printers, inks, and integrated marking systems to ensure traceability and compliance.",
        "website": "https://www.aztecfluids.com",
        "featured": False,
        "services": ["Investor Relations", "Public Relations"],
        "testimonial": {
            "quote": "ConfideLeap provided us with the investor relations foundation we needed as a growing listed company. Their communication frameworks are practical and effective.",
            "personName": "Management Team",
            "personRole": "Aztec Fluids & Machinery Limited"
        },
        "order": 8,
    },
    {
        "_id": "client-rbm-infracon",
        "_type": "client",
        "name": "RBM Infracon Limited",
        "slug": slug("rbm-infracon"),
        "industry": "Oil & Gas",
        "description": "RBM Infracon is an infrastructure and energy company with business interests spanning EPC project execution and oil & gas exploration. The company operates across challenging terrains and serves both public sector and private enterprise clients with a focus on project delivery, safety, and technical excellence.",
        "website": "https://www.rbminfracon.com",
        "featured": False,
        "services": ["Investor Relations", "Annual Report"],
        "testimonial": {
            "quote": "The annual report and IR advisory services from ConfideLeap were exactly what we needed to communicate our diversified business model to investors clearly.",
            "personName": "Management Team",
            "personRole": "RBM Infracon Limited"
        },
        "order": 9,
    },
    {
        "_id": "client-prospect-consumer",
        "_type": "client",
        "name": "Prospect Consumer Products Ltd",
        "slug": slug("prospect-consumer-products"),
        "industry": "Agricultural Export",
        "description": "Prospect Consumer Products is a cashew processing and export company that supplies premium quality cashew kernels to wholesale distributors and retailers globally. The company operates modern processing facilities with stringent quality controls, serving markets across North America, Europe, and the Middle East.",
        "website": "https://www.prospectconsumer.com",
        "featured": False,
        "services": ["Investor Relations", "Digital Marketing"],
        "testimonial": {
            "quote": "ConfideLeap helped us reach the right institutional audience and communicate the strength of our export-driven model in a way that resonated with investors.",
            "personName": "Management Team",
            "personRole": "Prospect Consumer Products Ltd"
        },
        "order": 10,
    },
]


def mutate(documents, op="createOrReplace"):
    mutations = [{op: doc} for doc in documents]
    payload = json.dumps({"mutations": mutations}).encode("utf-8")
    req = urllib.request.Request(URL, data=payload, headers={
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json",
    })
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print("Error:", e.status, e.read().decode())
        return None


print(f"Pushing {len(CLIENTS)} clients to Sanity...")
result = mutate(CLIENTS)
if result:
    print(f"OK - {len(result['results'])} clients created/updated")
    print("Transaction:", result.get("transactionId"))

    # Verify
    print("\nVerifying...")
    import urllib.parse
    q = urllib.parse.quote('*[_type == "client"] | order(order asc) { name, industry, "slug": slug.current, featured }')
    vurl = f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/query/{DATASET}?query={q}"
    with urllib.request.urlopen(vurl) as r:
        data = json.loads(r.read())
    for c in data["result"]:
        star = "[featured]" if c["featured"] else ""
        print(f"  {c['order'] if 'order' in c else '-'}. {c['name']} ({c['industry']}) {star}")
