import { Page } from '../page';
import '@mazdik-lib/dynamic-form';
import { DynamicFormComponent, DynamicFormElement } from '@mazdik-lib/dynamic-form';
import { Validators } from '@mazdik-lib/common';

export default class DynamicFormDemo implements Page {

  get template(): string {
    return `<web-dynamic-form class="dynamic-form-demo"></web-dynamic-form>`;
  }

  private dynElements: DynamicFormElement[] = [
    new DynamicFormElement({
      title: 'Multiple Select',
      name: 'multiple_select',
      type: 'select-dropdown',
      options: [
        { id: '1', name: 'CLERIC' },
        { id: '2', name: 'RANGER' },
        { id: '3', name: 'WARRIOR' },
        { id: '4', name: 'GLADIATOR' },
        { id: '5', name: 'SCOUT' },
        { id: '6', name: 'MAGE' },
        { id: '7', name: 'TEMPLAR' },
        { id: '8', name: 'SORCERER' },
        { id: '9', name: 'ASSASSIN' },
      ],
      multiple: true
    }),
    new DynamicFormElement({
      title: 'Name',
      name: 'name',
      validatorFunc: Validators.get({ required: true, minLength: 2, pattern: '^[a-zA-Z ]+$' }),
    }),
    new DynamicFormElement({
      title: 'Race',
      name: 'race',
      type: 'select',
      options: [
        { id: 'ASMODIANS', name: 'ASMODIANS' },
        { id: 'ELYOS', name: 'ELYOS' },
      ],
      validatorFunc: Validators.get({ required: true }),
    }),
    new DynamicFormElement({
      title: 'Cascading Select',
      name: 'note',
      type: 'select-dropdown',
      getOptionsFunc: this.getOptions,
      optionsUrl: 'assets/options.json',
      dependsElement: 'race',
    }),
    new DynamicFormElement({
      title: 'Gender',
      name: 'gender',
      type: 'radio',
      options: [
        { id: 'MALE', name: 'MALE' },
        { id: 'FEMALE', name: 'FEMALE' },
      ],
    }),
    new DynamicFormElement({
      title: 'Exp',
      name: 'exp',
      type: 'number',
      validatorFunc: Validators.get({ required: true, maxLength: 10, pattern: '^[0-9]+$' }),
    }),
    new DynamicFormElement({
      title: 'Last online',
      name: 'last_online',
      type: 'datetime-local',
    }),
    new DynamicFormElement({
      title: 'Account name',
      name: 'account_name',
      type: 'select-modal',
      getOptionsFunc: this.getOptions,
      optionsUrl: 'assets/accounts.json',
      keyElement: 'account_id',
    }),
    new DynamicFormElement({
      title: 'Account id',
      name: 'account_id'
    }),
    new DynamicFormElement({
      title: 'Player class',
      name: 'player_class',
      validatorFunc: this.customValidation,
    }),
    new DynamicFormElement({
      title: 'Online',
      name: 'online',
      type: 'checkbox',
      options: [
        { id: '1', name: 'Online' }
      ]
    }),
    new DynamicFormElement({
      title: 'Comment',
      name: 'comment',
      type: 'textarea',
    }),
  ];

  load() {
    const component = document.querySelector('web-dynamic-form') as DynamicFormComponent;
    component.dynElements = this.dynElements;
    component.addEventListener('valid', (event: CustomEvent) => {
      console.log(event.detail);
    });
  }

  private customValidation(name: string, value: any): string[] {
    return (value == null || value.length === 0) ? ['Custom validator ' + name] : [];
  }

  private getOptions(url: string, parentId: any): Promise<any> {
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        const result = res.filter((value: any) => {
          return value.parentId === parentId;
        });
        return new Promise((resolve) => {
          setTimeout(() => resolve(result), 1000);
        });
      });
  }

}
