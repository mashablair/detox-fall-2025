import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingComponent {
  commonGutHealthStruggles = [
    {
      icon: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z', // Warning triangle for bloating
      description: 'Вы просыпаетесь с ощущением тяжести и вздутия.',
    },
    {
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z', // Lightning bolt for energy crashes
      description: 'Ваша энергия падает в середине дня.',
    },
    {
      icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z', // Moon for poor sleep
      description: 'Ваш сон беспокойный, и вы никогда не просыпаетесь по-настоящему отдохнувшими.',
    },
    {
      icon: 'M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z', // Sad face for mood swings
      description:
        'Перепады настроения возникают без предупреждения, делая вас раздражительными или подавленными.',
    },
    {
      icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178ZM15 12a3 3 0 11-6 0 3 3 0 016 0Z', // Eye for brain fog (clarity/focus)
      description: 'Туман в голове мешает сосредоточиться или мыслить ясно.',
    },
    {
      icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-3.47c0-.09-.002-.18-.007-.268a2.25 2.25 0 00-.193-1.635zM12.75 12.75a3 3 0 11-6 0 3 3 0 016 0zm4.47 3.372a2.25 2.25 0 00-.193-1.635 3 3 0 00-5.78 1.128c-.005.088-.007.178-.007.268a4.5 4.5 0 008.4-3.47 2.25 2.25 0 01-2.42 2.245z', // Sparkles/stars for skin issues (inflammation/breakouts)
      description: 'Ваша кожа воспаляется или покрывается высыпаниями, что бы вы ни пробовали.',
    },
  ];

  problemsWithoutDetox = [
    {
      id: 1,
      description: 'Снижается чувствительность к инсулину.',
    },
    {
      id: 2,
      description: 'Растёт воспаление.',
    },
    {
      id: 3,
      description: 'Замедляется митохондриальная функция.',
    },
    {
      id: 4,
      description: 'Нарушается гормональный баланс.',
    },
    {
      id: 5,
      description: 'Ухудшаются кожа, волосы, сон и энергия.',
    },
  ];
}
