using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PokerPlanning.Core.Data;
using PokerPlanning.Core.Models;

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

        public async Task Join(Guid roomId, string userName, UserRole role)
        {
            if (string.IsNullOrEmpty(userName))
                return;
            var room = _repository.GetById(roomId);
            if (room != null)
            {
                var connectionId = Context.ConnectionId;

                var user = room.Users.FirstOrDefault(u => u.Name == userName && u.Role == role);
                if (user == null)
                {
                    user = new PlanningUser
                    {
                        Id = Guid.NewGuid(),
                        Name = userName,
                        ConnectionId = connectionId,
                        Role = room.Users.Count == 0
                            ? UserRole.Owner
                            : role
                    };
                    room.Users.Add(user);
                }
                else
                {
                    user.ConnectionId = connectionId;
                }

                _roomConnectionsStorage.RoomConnections.TryAdd(connectionId, room.Id);
                await Clients.Caller.SendAsync("onJoined", user);
                await Clients.All.SendAsync("onUsersChanged", room.Users);
            }
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

                await Clients.AllExcept(connectionId).SendAsync("onUserDisconnected", room.Users);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}