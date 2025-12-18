import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, BarChart3, Users, Zap } from 'lucide-react';

type Range = '7d' | '30d' | '90d';
type SortKey = 'page' | 'views' | 'conversion';
type SortDir = 'asc' | 'desc';

const RANGE_LABEL: Record<Range, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
};

function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US').format(n);
}

function formatPct(n: number) {
  return `${(n * 100).toFixed(1)}%`;
}

export const AnalyticsDashboardDemo = () => {
  const [range, setRange] = useState<Range>('30d');
  const [sortKey, setSortKey] = useState<SortKey>('views');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const seriesByRange: Record<Range, number[]> = {
    '7d': [210, 240, 198, 260, 290, 310, 340],
    '30d': [120, 132, 145, 160, 155, 170, 190, 210, 205, 225, 240, 260, 255, 280],
    '90d': [80, 92, 105, 98, 120, 135, 140, 155, 162, 170, 190, 205, 198, 215, 230],
  };

  const topPagesByRange: Record<
    Range,
    Array<{ page: string; views: number; conversion: number }>
  > = {
    '7d': [
      { page: '/pricing', views: 980, conversion: 0.048 },
      { page: '/home', views: 1240, conversion: 0.031 },
      { page: '/case-studies', views: 630, conversion: 0.054 },
      { page: '/blog/react-performance', views: 410, conversion: 0.018 },
      { page: '/contact', views: 220, conversion: 0.082 },
    ],
    '30d': [
      { page: '/home', views: 8420, conversion: 0.027 },
      { page: '/pricing', views: 6120, conversion: 0.044 },
      { page: '/case-studies', views: 3210, conversion: 0.051 },
      { page: '/blog/react-performance', views: 1940, conversion: 0.019 },
      { page: '/contact', views: 880, conversion: 0.075 },
    ],
    '90d': [
      { page: '/home', views: 24100, conversion: 0.026 },
      { page: '/pricing', views: 17980, conversion: 0.041 },
      { page: '/case-studies', views: 9820, conversion: 0.049 },
      { page: '/blog/react-performance', views: 6210, conversion: 0.017 },
      { page: '/contact', views: 2830, conversion: 0.072 },
    ],
  };

  const series = seriesByRange[range];

  const kpis = useMemo(() => {
    const totalVisitors = series.reduce((a, b) => a + b, 0);
    const signups = Math.round(totalVisitors * (range === '7d' ? 0.052 : range === '30d' ? 0.045 : 0.041));
    const conversion = totalVisitors === 0 ? 0 : signups / totalVisitors;
    const avgDaily = totalVisitors / series.length;
    return { totalVisitors, signups, conversion, avgDaily };
  }, [range, series]);

  const chart = useMemo(() => {
    const w = 480;
    const h = 160;
    const pad = 16;
    const max = Math.max(...series);
    const min = Math.min(...series);
    const span = Math.max(1, max - min);

    const points = series
      .map((v, i) => {
        const x = pad + (i * (w - pad * 2)) / Math.max(1, series.length - 1);
        const y = pad + (h - pad * 2) * (1 - (v - min) / span);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    // Simple area under the curve
    const area = `${pad},${h - pad} ${points} ${w - pad},${h - pad}`;

    return { w, h, pad, points, area, max, min };
  }, [series]);

  const rows = useMemo(() => {
    const base = [...topPagesByRange[range]];
    base.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return base;
  }, [range, sortDir, sortKey]);

  function toggleSort(nextKey: SortKey) {
    if (nextKey === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(nextKey);
    setSortDir('desc');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Interactive Demo</div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Analytics Dashboard
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Toggle timeframe, watch KPIs update, and sort the table. This demo is intentionally lightweight (no backend).
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <Button
              key={r}
              size="sm"
              variant={range === r ? 'primary' : 'outline'}
              onClick={() => setRange(r)}
            >
              {RANGE_LABEL[r]}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card hover={false} className="bg-secondary/30 border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Visitors</div>
              <div className="text-2xl font-bold">{formatNumber(kpis.totalVisitors)}</div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Avg/day: <span className="text-foreground font-medium">{formatNumber(Math.round(kpis.avgDaily))}</span>
          </div>
        </Card>

        <Card hover={false} className="bg-secondary/30 border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Signups</div>
              <div className="text-2xl font-bold">{formatNumber(kpis.signups)}</div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Conversion: <span className="text-foreground font-medium">{formatPct(kpis.conversion)}</span>
          </div>
        </Card>

        <Card hover={false} className="bg-secondary/30 border-white/10">
          <div className="text-sm text-muted-foreground">Trend</div>
          <div className="text-xs text-muted-foreground mt-1">
            Min: <span className="text-foreground font-medium">{formatNumber(chart.min)}</span> • Max:{' '}
            <span className="text-foreground font-medium">{formatNumber(chart.max)}</span>
          </div>
          <div className="mt-3">
            <svg viewBox={`0 0 ${chart.w} ${chart.h}`} className="w-full h-24">
              <defs>
                <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="rgb(59 130 246 / 0.35)" />
                  <stop offset="1" stopColor="rgb(59 130 246 / 0.02)" />
                </linearGradient>
              </defs>
              <path d={`M ${chart.area}`} fill="url(#area)" />
              <polyline
                points={chart.points}
                fill="none"
                stroke="rgb(59 130 246)"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </Card>
      </div>

      <Card hover={false} className="border-white/10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-sm font-semibold">Top Pages</div>
            <div className="text-xs text-muted-foreground">Click headers to sort.</div>
          </div>
          <div className="text-xs text-muted-foreground">
            Sorted by: <span className="text-foreground font-medium">{sortKey}</span> ({sortDir})
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr className="border-b border-white/10">
                <th className="py-2 pr-4">
                  <button
                    type="button"
                    onClick={() => toggleSort('page')}
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Page
                    <SortIcon active={sortKey === 'page'} dir={sortDir} />
                  </button>
                </th>
                <th className="py-2 pr-4">
                  <button
                    type="button"
                    onClick={() => toggleSort('views')}
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Views
                    <SortIcon active={sortKey === 'views'} dir={sortDir} />
                  </button>
                </th>
                <th className="py-2">
                  <button
                    type="button"
                    onClick={() => toggleSort('conversion')}
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Conversion
                    <SortIcon active={sortKey === 'conversion'} dir={sortDir} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.page} className="border-b border-white/5">
                  <td className="py-3 pr-4 font-medium text-foreground">{r.page}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{formatNumber(r.views)}</td>
                  <td className="py-3 text-muted-foreground">{formatPct(r.conversion)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="text-xs text-muted-foreground">
        Tip: This kind of dashboard is where clean component boundaries + TypeScript really pays off as requirements grow.
      </div>
    </div>
  );
};

const SortIcon = ({ active, dir }: { active: boolean; dir: SortDir }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-4 w-4 rounded',
        active ? 'text-primary' : 'text-muted-foreground/60'
      )}
      aria-hidden="true"
    >
      {dir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
    </span>
  );
};


