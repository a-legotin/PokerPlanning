using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using PokerPlanning.Core.Data;
using PokerPlanning.Core.Models;

namespace PokerPlanning.Data.Repositories
{
    internal class InMemoryRoomRepository : IRoomRepository
    {
        private readonly ConcurrentDictionary<Guid, PlanningRoom> _rooms =
            new ConcurrentDictionary<Guid, PlanningRoom>();

        public IEnumerable<PlanningRoom> GetAll() => _rooms.Values;

        public PlanningRoom GetById(Guid id) =>
            !_rooms.TryGetValue(id, out var room)
                ? null
                : room;

        public void Insert(PlanningRoom entity)
        {
            _rooms.TryAdd(entity.Id, entity);
        }

        public void Update(PlanningRoom entity)
        {
            if (!_rooms.ContainsKey(entity.Id))
                return;
            _rooms[entity.Id] =  entity;
        }

        public void Delete(Guid id)
        {
            _rooms.TryRemove(id, out _);
        }
    }
}