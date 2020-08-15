using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using PokerPlanning.Core.Data;
using PokerPlanning.Core.Models;

namespace PokerPlanning.Data.Repositories
{
    internal class InMemoryCardsTemplateRepository : ICardsTemplateRepository
    {
        private readonly ConcurrentDictionary<Guid, PlanningCardsTemplate> _templates =
            new ConcurrentDictionary<Guid, PlanningCardsTemplate>();

        public InMemoryCardsTemplateRepository()
        {
            var template = new PlanningCardsTemplate()
            {
                Id = Guid.NewGuid(),
                Cards = new PlanningCardSet
                {
                    Cards = new HashSet<PlanningCard>(Enumerable.Range(1, 6)
                        .Select(num => new PlanningCard
                        {
                            Id = Guid.NewGuid(),
                            Display = num.ToString(),
                            Value = num.ToString()
                        }))
                }
            };
            _templates.TryAdd(template.Id, template);
        }

        public IEnumerable<PlanningCardsTemplate> GetAll() => _templates.Values;

        public PlanningCardsTemplate GetById(Guid id)
        {
            return !_templates.TryGetValue(id, out var room) 
                ? null 
                : room;
        }

        public void Insert(PlanningCardsTemplate entity)
        {
            _templates.TryAdd(entity.Id, entity);
        }

        public void Update(PlanningCardsTemplate entity)
        {
            if (!_templates.ContainsKey(entity.Id)) 
                return;
            _templates[entity.Id] =  entity;
        }

        public void Delete(Guid id)
        {
            _templates.TryRemove(id, out _);
        }
    }
}