import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';
import { getRoleSummaryData } from '@/mocks/events';
import { cn } from '@/lib/utils';

interface RoleSummaryProps {
  role: UserRole;
  className?: string;
}

export const RoleSummary: React.FC<RoleSummaryProps> = ({
  role,
  className,
}) => {
  const data = getRoleSummaryData(role);

  if (data.stats.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-xl font-bold text-foreground mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
