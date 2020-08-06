using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PokerPlanning.Core;

namespace PokerPlanning.Network.Hubs
{
    public class PlanningRoomHub : Hub
    {
        private static readonly ConcurrentDictionary<Guid, PlanningRoom> _rooms =
            new ConcurrentDictionary<Guid, PlanningRoom>();

        public async Task CreatePlanningRoom(string userName)
        {
            var user = new PlanningUser
            {
                Id = Guid.NewGuid(),
                Name = userName,
                ConnectionId = Context.ConnectionId,
                Role = UserRole.Owner
            };
            
            var room = new PlanningRoom();
            room.Users.Add(user);
            if (_rooms.TryGetValue(room.Id, out var existingRoom))
            {
                await Clients.Caller.SendAsync("onRoomCreated", existingRoom);
            }
            else
            {
                _rooms.TryAdd(room.Id, room);
                await Clients.Caller.SendAsync("onRoomCreated", room);
            }
        }

        public async Task Join(string userName, Guid roomId)
        {
            var connectionId = Context.ConnectionId;
            var user = new PlanningUser
            {
                Id = Guid.NewGuid(),
                Name = userName,
                ConnectionId = connectionId
            };

            if (_rooms.TryGetValue(roomId, out var existingRoom))
            {
                await Clients.Caller.SendAsync("onConnected", user, existingRoom.Users);
                await Clients.AllExcept(connectionId).SendAsync("onNewUserConnected", user);
            }
        }

        public async Task Test()
        {
            await Clients.Caller.SendAsync("onTested");
        }
    }
}