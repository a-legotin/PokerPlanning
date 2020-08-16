using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using PokerPlanning.Core.Data;
using PokerPlanning.Core.Models;

namespace PokerPlanning.Data.Repositories
{
    internal class InMemoryPlanningRoundRepository : IPlanningRoundRepository
    {
        private readonly ConcurrentDictionary<Guid, PlanningRound> _rounds =
            new ConcurrentDictionary<Guid, PlanningRound>();

        public IEnumerable<PlanningRound> GetAll() => _rounds.Values;

        public PlanningRound GetById(Guid id)
        {
            return !_rounds.TryGetValue(id, out var room) 
                ? null 
                : room;
        }

        public void Insert(PlanningRound entity)
        {
            _rounds.TryAdd(entity.Id, entity);
        }

        public void Update(PlanningRound entity)
        {
            if (!_rounds.ContainsKey(entity.Id)) 
                return;
            _rounds[entity.Id] =  entity;
        }

        public void Delete(Guid id)
        {
            _rounds.TryRemove(id, out _);
        }
    }
}