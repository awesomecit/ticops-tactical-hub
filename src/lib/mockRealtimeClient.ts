/**
 * Mock Realtime Client - Simulates WebSocket/Supabase Realtime behavior
 * This allows developing real-time features without a backend
 */

type EventCallback = (payload: any) => void;
type ChannelEvent = 'INSERT' | 'UPDATE' | 'DELETE' | 'BROADCAST' | 'PRESENCE';

interface Subscription {
  event: ChannelEvent;
  table?: string;
  callback: EventCallback;
}

interface PresenceState {
  [key: string]: {
    id: string;
    username: string;
    avatar?: string;
    online_at: string;
    status: 'online' | 'away' | 'busy';
    currentPage?: string;
  }[];
}

class MockChannel {
  private subscriptions: Subscription[] = [];
  private presenceState: PresenceState = {};
  private presenceCallbacks: {
    sync: EventCallback[];
    join: EventCallback[];
    leave: EventCallback[];
  } = { sync: [], join: [], leave: [] };

  constructor(public name: string) {}

  on(
    type: 'postgres_changes' | 'broadcast' | 'presence',
    filter: { event: string; schema?: string; table?: string } | { event: string },
    callback: EventCallback
  ): MockChannel {
    if (type === 'presence') {
      const presenceEvent = filter.event as 'sync' | 'join' | 'leave';
      this.presenceCallbacks[presenceEvent].push(callback);
    } else {
      this.subscriptions.push({
        event: filter.event as ChannelEvent,
        table: 'table' in filter ? filter.table : undefined,
        callback,
      });
    }
    return this;
  }

  subscribe(callback?: (status: string) => void): MockChannel {
    // Simulate subscription delay
    setTimeout(() => {
      callback?.('SUBSCRIBED');
    }, 100);
    return this;
  }

  unsubscribe(): void {
    this.subscriptions = [];
    this.presenceCallbacks = { sync: [], join: [], leave: [] };
  }

  // Simulate receiving a database change
  _simulateChange(event: ChannelEvent, table: string, payload: any): void {
    this.subscriptions
      .filter(sub => sub.event === event && (!sub.table || sub.table === table))
      .forEach(sub => sub.callback(payload));
  }

  // Simulate receiving a broadcast
  _simulateBroadcast(event: string, payload: any): void {
    this.subscriptions
      .filter(sub => sub.event === 'BROADCAST')
      .forEach(sub => sub.callback({ event, payload }));
  }

  // Presence methods
  async track(state: any): Promise<'ok' | 'error'> {
    const key = state.id || 'anonymous';
    this.presenceState[key] = [{ ...state, online_at: new Date().toISOString() }];
    
    // Notify presence callbacks
    this.presenceCallbacks.join.forEach(cb => 
      cb({ key, newPresences: this.presenceState[key] })
    );
    this.presenceCallbacks.sync.forEach(cb => cb(undefined));
    
    return 'ok';
  }

  getPresenceState(): PresenceState {
    return this.presenceState;
  }

  _simulateJoin(userId: string, userData: any): void {
    this.presenceState[userId] = [userData];
    this.presenceCallbacks.join.forEach(cb => 
      cb({ key: userId, newPresences: [userData] })
    );
    this.presenceCallbacks.sync.forEach(cb => cb(undefined));
  }

  _simulateLeave(userId: string): void {
    const leftPresences = this.presenceState[userId];
    delete this.presenceState[userId];
    this.presenceCallbacks.leave.forEach(cb => 
      cb({ key: userId, leftPresences })
    );
    this.presenceCallbacks.sync.forEach(cb => cb(undefined));
  }
}

class MockRealtimeClient {
  private channels: Map<string, MockChannel> = new Map();
  private simulationIntervals: Map<string, NodeJS.Timeout> = new Map();

  channel(name: string): MockChannel {
    if (!this.channels.has(name)) {
      this.channels.set(name, new MockChannel(name));
    }
    return this.channels.get(name)!;
  }

  removeChannel(channel: MockChannel): void {
    channel.unsubscribe();
    this.channels.delete(channel.name);
  }

  // Start simulating random events for demo purposes
  startSimulation(channelName: string, options: {
    notificationsInterval?: number;
    presenceInterval?: number;
    chatInterval?: number;
  } = {}): void {
    const channel = this.channels.get(channelName);
    if (!channel) return;

    // Simulate random notifications
    if (options.notificationsInterval) {
      const interval = setInterval(() => {
        const notifications = [
          { type: 'match_invite', title: 'Nuovo invito partita', message: 'Sei stato invitato a una partita!' },
          { type: 'team_update', title: 'Aggiornamento squadra', message: 'Il tuo team ha un nuovo membro' },
          { type: 'achievement', title: 'Achievement!', message: 'Hai sbloccato un nuovo achievement' },
        ];
        const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
        channel._simulateChange('INSERT', 'notifications', {
          new: { id: Date.now(), ...randomNotif, created_at: new Date().toISOString() }
        });
      }, options.notificationsInterval);
      this.simulationIntervals.set(`${channelName}-notifications`, interval);
    }

    // Simulate presence changes
    if (options.presenceInterval) {
      const mockUsers = [
        { id: 'user_sim_1', username: 'TacticalSniper', status: 'online' as const },
        { id: 'user_sim_2', username: 'GhostRecon', status: 'away' as const },
        { id: 'user_sim_3', username: 'ShadowHunter', status: 'online' as const },
      ];
      let index = 0;
      const interval = setInterval(() => {
        const user = mockUsers[index % mockUsers.length];
        if (Math.random() > 0.5) {
          channel._simulateJoin(user.id, { ...user, online_at: new Date().toISOString() });
        } else {
          channel._simulateLeave(user.id);
        }
        index++;
      }, options.presenceInterval);
      this.simulationIntervals.set(`${channelName}-presence`, interval);
    }
  }

  stopSimulation(channelName: string): void {
    ['notifications', 'presence', 'chat'].forEach(type => {
      const key = `${channelName}-${type}`;
      const interval = this.simulationIntervals.get(key);
      if (interval) {
        clearInterval(interval);
        this.simulationIntervals.delete(key);
      }
    });
  }

  stopAllSimulations(): void {
    this.simulationIntervals.forEach((interval) => clearInterval(interval));
    this.simulationIntervals.clear();
  }
}

// Singleton instance
export const mockRealtimeClient = new MockRealtimeClient();

// Export types
export type { MockChannel, PresenceState, ChannelEvent };
