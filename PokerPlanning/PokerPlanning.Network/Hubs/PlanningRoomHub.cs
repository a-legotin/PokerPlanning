using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PokerPlanning.Core.Data;
using PokerPlanning.Core.Models;
using PokerPlanning.Data;

namespace PokerPlanning.Network.Hubs
{
    public class PlanningRoomHub : Hub
    {

        private readonly IRoomRepository _repository;
        private readonly IRoomConnectionsStorage _roomConnectionsStorage;

        public PlanningRoomHub(IRoomRepository repository, IRoomConnectionsStorage roomConnectionsStorage)
        {
            _repository = repository;
            _roomConnectionsStorage = roomConnectionsStorage;
        }

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

            _repository.Insert(room);
             await Clients.Caller.SendAsync("onRoomCreated", room);
        }

        public async Task Join(Guid roomId, string userName, UserRole role)
        {
            var room = _repository.GetById(roomId);
            if (room != null)
            {
                var connectionId = Context.ConnectionId;
                var user = new PlanningUser
                {
                    Id = Guid.NewGuid(),
                    Name = userName,
                    ConnectionId = connectionId,
                    Role = role
                };
                room.Users.Add(user);
                _roomConnectionsStorage.RoomConnections.TryAdd(connectionId, room.Id);
                await Clients.Caller.SendAsync("onConnected", user, room);
                await Clients.AllExcept(connectionId).SendAsync("onUsersChanged", room.Users);
            }
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;
            if (_roomConnectionsStorage.RoomConnections.TryGetValue(connectionId, out var roomId))
            {
                var room = _repository.GetById(roomId);
                var disconnectedUser = room.Users.FirstOrDefault(user => user.ConnectionId == connectionId);
                room.Users.Remove(disconnectedUser);
                if (room.Users.Count(user => user.Role != UserRole.Observer) == 1)
                {
                    var lastUser = room.Users.First();
                    lastUser.Role = UserRole.Owner;
                }
                _repository.Update(room);
                
                await Clients.AllExcept(connectionId).SendAsync("onUserDisconnected", disconnectedUser);
            }
            await base.OnDisconnectedAsync(exception);
        }
    }
}