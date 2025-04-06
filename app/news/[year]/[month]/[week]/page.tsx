import { Sidebar } from "@/app/components/sidebar";
import { NewsList } from "@/app/components/news-list";
import { NewsGroup, NewsItem } from "@/app/types";

const mockNewsGroups: NewsGroup[] = [
  {
    year: 2024,
    months: [
      {
        month: 4,
        weeks: [
          {
            week: 1,
            items: [
              {
                id: "6",
                title: "Ethereum Prepares for Cancun-Deneb Upgrade",
                description: "The Ethereum network is gearing up for its next major upgrade, Cancun-Deneb, which will introduce proto-danksharding and other improvements. Testing on multiple testnets has shown promising results.",
                externalLink: "https://ethereum.org",
                date: "2024-04-01",
                week: 1,
                month: 4,
                year: 2024,
              }
            ],
          }
        ],
      }
    ],
  },
  {
    year: 2025,
    months: [
      {
        month: 3,
        weeks: [
          {
            week: 2,
            items: [
              {
                id: "1",
                title: "Ethereum Cancun-Deneb Upgrade Successfully Activated on Mainnet",
                description: "The highly anticipated Cancun-Deneb upgrade has been successfully implemented on Ethereum's mainnet, bringing significant improvements to scalability and efficiency. The upgrade introduces proto-danksharding (EIP-4844) which substantially reduces costs for layer-2 solutions.",
                externalLink: "https://ethereum.org",
                date: "2025-03-07",
                week: 2,
                month: 3,
                year: 2025,
              },
              {
                id: "2",
                title: "New All-Time High in Ethereum Staking Participation",
                description: "Ethereum has reached a new milestone with over 25% of total ETH supply now being staked, demonstrating growing confidence in the network's proof-of-stake consensus mechanism. This increased participation strengthens network security and decentralization.",
                externalLink: "https://ethereum.org",
                date: "2025-03-06",
                week: 2,
                month: 3,
                year: 2025,
              },
              {
                id: "3",
                title: "Major DeFi Protocols Complete Integration with EIP-4844",
                description: "Leading DeFi protocols have successfully integrated with EIP-4844, leveraging the new blob transaction type to significantly reduce transaction costs. Early data shows up to 90% reduction in layer-2 fees for certain operations.",
                externalLink: "https://ethereum.org",
                date: "2025-03-05",
                week: 2,
                month: 3,
                year: 2025,
              }
            ],
          },
          {
            week: 1,
            items: [
              {
                id: "4",
                title: "Ethereum Foundation Announces New Research Grants",
                description: "The Ethereum Foundation has announced a new wave of research grants focusing on zero-knowledge technology and layer-2 scaling solutions. The grants aim to accelerate development of critical infrastructure and improve network efficiency.",
                externalLink: "https://ethereum.org",
                date: "2025-03-01",
                week: 1,
                month: 3,
                year: 2025,
              }
            ],
          }
        ],
      },
      {
        month: 2,
        weeks: [
          {
            week: 4,
            items: [
              {
                id: "5",
                title: "Ethereum Layer-2 TVL Reaches Historic $50 Billion",
                description: "The total value locked (TVL) in Ethereum layer-2 solutions has surpassed $50 billion, marking a significant milestone in the ecosystem's scaling journey. This growth reflects increasing adoption of rollup technologies and improved infrastructure.",
                externalLink: "https://ethereum.org",
                date: "2025-02-28",
                week: 4,
                month: 2,
                year: 2025,
              }
            ],
          }
        ],
      }
    ],
  }
];

interface PageProps {
  params: {
    year: string;
    month: string;
    week: string;
  };
}

export function generateStaticParams() {
  const paths = [];
  
  for (const group of mockNewsGroups) {
    for (const month of group.months) {
      for (const week of month.weeks) {
        paths.push({
          year: group.year.toString(),
          month: month.month.toString(),
          week: week.week.toString(),
        });
      }
    }
  }
  
  return paths;
}

export default function NewsPage({ params }: PageProps) {
  const year = parseInt(params.year);
  const month = parseInt(params.month);
  const week = parseInt(params.week);

  const newsItems: NewsItem[] =
    mockNewsGroups
      .find((g) => g.year === year)
      ?.months.find((m) => m.month === month)
      ?.weeks.find((w) => w.week === week)?.items || [];

  return (
    <>
      <Sidebar newsGroups={mockNewsGroups} />
      <div className="flex-1">
        <NewsList items={newsItems} />
      </div>
    </>
  );
}