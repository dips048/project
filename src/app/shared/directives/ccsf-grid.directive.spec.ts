import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CcsfGridDirective } from './ccsf-grid.directive';

@Component({
  template: `
  <h2 highlight="skyblue">About</h2>
  <h3>Quote of the day:</h3>
  `
})
export class TestComponent { }

describe('CcsfGridDirective', () => {
  let fixture: ComponentFixture<TestComponent>;;
  let des: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ CcsfGridDirective, TestComponent ]
    })
    .createComponent(TestComponent);
    fixture.detectChanges(); // initial binding
  
    // all elements with an attached CcsfGridDirective
    des = fixture.debugElement.query(By.directive(CcsfGridDirective));
  
  });
  
  // it('should create an instance', () => {
  //   const directive = new CcsfGridDirective();
  //   expect(directive).toBeTruthy();
  // });

  // color tests
  // it('should have three highlighted elements', () => {
  //   expect(des).toBe(3);
  // });
  
  it('should color 1st <h2> background "yellow"', () => {
    const bgColor = des.nativeElement.api;
    expect(bgColor).toBe('yellow');
  });
  
  // it('should color 2nd <h2> background w/ default color', () => {
  //   const dir = des[1].injector.get(CcsfGridDirective) as CcsfGridDirective;
  //   const bgColor = des[1].nativeElement.style.backgroundColor;
  //   expect(bgColor).toBe(dir.defaultColor);
  // });
  
  it('should bind <input> background to value color', () => {
    // easier to work with nativeElement
    const input = des[2].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor).toBe('cyan', 'initial backgroundColor');
  
    input.value = 'green';
  
    // Dispatch a DOM event so that Angular responds to the input value change.
    // In older browsers, such as IE, you might need a CustomEvent instead. See
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  
    expect(input.style.backgroundColor).toBe('green', 'changed backgroundColor');
  });
  
  
  // it('bare <h2> should not have a customProperty', () => {
  //   expect(bareH2.properties['customProperty']).toBeUndefined();
  // });
});



