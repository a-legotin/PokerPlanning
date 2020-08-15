import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CardTemplate} from '../../../models/cardTemplate';
import {LogService} from '../../../services/logging/log.service';

@Component({
  selector: 'app-cards-templates',
  templateUrl: './cards.templates.component.html',
})

export class CardsTemplatesComponent implements OnInit {

  @Input() templates: CardTemplate[];
  @Output() currentTemplate = new EventEmitter<CardTemplate>();

  constructor(private log: LogService) {
  }

  ngOnInit(): void {
  }

  setCurrentTemplate(template: CardTemplate) {
    this.log.debug('Setting current template to ' + template.id);
    this.currentTemplate.emit(template);
  }
}
