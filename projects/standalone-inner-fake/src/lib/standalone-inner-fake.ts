import { Component, reflectComponentType, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  standalone: true,
  template: '',
})
class FakedComponent {
}

function newClass() {
  return class extends FakedComponent {
  };
}

export function fakeInnerComponents(parent: Type<any>, components: Type<any>[]): void {
  components.forEach((component) => {
    const newMock = newClass();
    TestBed.overrideComponent(parent, {
      remove: { imports: [ component ] },
      add: { imports: [ newMock ] },
    });
    const componentMetaData = reflectComponentType(component);
    const selector = componentMetaData?.selector || 'fake-component';
    const inputs = componentMetaData?.inputs.map((i: { propName: any; }) => i.propName) || [];
    const outputs = componentMetaData?.outputs.map((o: { propName: any; }) => o.propName) || [];
    TestBed.overrideComponent(newMock, {
      set: {
        selector,
        inputs,
        outputs,
      },
    });
  })
};
