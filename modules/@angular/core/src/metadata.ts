/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * This indirection is needed to free up Component, etc symbols in the public API
 * to be used by the decorator versions of these annotations.
 */

import {AttributeMetadata, ContentChildMetadata, ContentChildrenMetadata, QueryMetadata, ViewChildMetadata, ViewChildrenMetadata, ViewQueryMetadata} from './metadata/di';
import {Component, Directive, HostBindingMetadata, HostListenerMetadata, InputMetadata, OutputMetadata, PipeMetadata, PipeMetadataType} from './metadata/directives';
import {ModuleWithProviders, NgModule, SchemaMetadata} from './metadata/ng_module';
import {ViewEncapsulation} from './metadata/view';
import {Type} from './type';
import {TypeDecorator, makeDecorator, makeParamDecorator, makePropDecorator} from './util/decorators';

export {ANALYZE_FOR_ENTRY_COMPONENTS, AttributeMetadata, ContentChildMetadata, ContentChildrenMetadata, QueryMetadata, ViewChildMetadata, ViewChildrenMetadata, ViewQueryMetadata} from './metadata/di';
export {Component, Directive, HostBindingMetadata, HostListenerMetadata, InputMetadata, OutputMetadata, PipeMetadata, PipeMetadataType} from './metadata/directives';
export {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnChanges, OnDestroy, OnInit} from './metadata/lifecycle_hooks';
export {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NO_ERRORS_SCHEMA, NgModule, SchemaMetadata} from './metadata/ng_module';
export {ViewEncapsulation} from './metadata/view';

/**
 * {@link AttributeMetadata} factory for creating annotations, decorators or DSL.
 *
 * ### Example as TypeScript Decorator
 *
 * {@example core/ts/metadata/metadata.ts region='attributeFactory'}
 *
 * ### Example as ES5 DSL
 *
 * ```
 * var MyComponent = ng
 *   .Component({...})
 *   .Class({
 *     constructor: [new ng.Attribute('title'), function(title) {
 *       ...
 *     }]
 *   })
 * ```
 *
 * ### Example as ES5 annotation
 *
 * ```
 * var MyComponent = function(title) {
 *   ...
 * };
 *
 * MyComponent.annotations = [
 *   new ng.Component({...})
 * ]
 * MyComponent.parameters = [
 *   [new ng.Attribute('title')]
 * ]
 * ```
 *
 * @stable
 */
export interface AttributeMetadataFactory {
  (name: string): TypeDecorator;
  new (name: string): AttributeMetadata;
}

/**
 * Factory for {@link ContentChildren}.
 * @stable
 */
export interface ContentChildrenMetadataFactory {
  (selector: Type<any>|Function|string,
   {descendants, read}?: {descendants?: boolean, read?: any}): any;
  new (
      selector: Type<any>|Function|string,
      {descendants, read}?: {descendants?: boolean, read?: any}): ContentChildrenMetadata;
}

/**
 * Factory for {@link ContentChild}.
 * @stable
 */
export interface ContentChildMetadataFactory {
  (selector: Type<any>|Function|string, {read}?: {read?: any}): any;
  new (selector: Type<any>|Function|string, {read}?: {read?: any}): ContentChildMetadataFactory;
}

/**
 * Factory for {@link ViewChildren}.
 * @stable
 */
export interface ViewChildrenMetadataFactory {
  (selector: Type<any>|Function|string, {read}?: {read?: any}): any;
  new (selector: Type<any>|Function|string, {read}?: {read?: any}): ViewChildrenMetadata;
}

/**
 * Factory for {@link ViewChild}.
 * @stable
 */
export interface ViewChildMetadataFactory {
  (selector: Type<any>|Function|string, {read}?: {read?: any}): any;
  new (selector: Type<any>|Function|string, {read}?: {read?: any}): ViewChildMetadataFactory;
}


/**
 * {@link PipeMetadata} factory for creating decorators.
 *
 * ### Example
 *
 * {@example core/ts/metadata/metadata.ts region='pipe'}
 * @stable
 */
export interface PipeMetadataFactory {
  (obj: PipeMetadataType): any;
  new (obj: PipeMetadataType): any;
}

/**
 * {@link InputMetadata} factory for creating decorators.
 *
 * See {@link InputMetadata}.
 * @stable
 */
export interface InputMetadataFactory {
  (bindingPropertyName?: string): any;
  new (bindingPropertyName?: string): any;
}

/**
 * {@link OutputMetadata} factory for creating decorators.
 *
 * See {@link OutputMetadata}.
 * @stable
 */
export interface OutputMetadataFactory {
  (bindingPropertyName?: string): any;
  new (bindingPropertyName?: string): any;
}

/**
 * {@link HostBindingMetadata} factory function.
 * @stable
 */
export interface HostBindingMetadataFactory {
  (hostPropertyName?: string): any;
  new (hostPropertyName?: string): any;
}

/**
 * {@link HostListenerMetadata} factory function.
 * @stable
 */
export interface HostListenerMetadataFactory {
  (eventName: string, args?: string[]): any;
  new (eventName: string, args?: string[]): any;
}

// TODO(vicb): delete ?
export {Directive as DirectiveMetadata};
export {Component as ComponentMetadata};
export {NgModule as NgModuleMetadata};

/**
 * Specifies that a constant attribute value should be injected.
 *
 * The directive can inject constant string literals of host element attributes.
 *
 * ### Example
 *
 * Suppose we have an `<input>` element and want to know its `type`.
 *
 * ```html
 * <input type="text">
 * ```
 *
 * A decorator can inject string literal `text` like so:
 *
 * {@example core/ts/metadata/metadata.ts region='attributeMetadata'}
 * @stable
 * @Annotation
 */
export var Attribute: AttributeMetadataFactory = makeParamDecorator(AttributeMetadata);


// TODO(alexeagle): remove the duplication of this doc. It is copied from ContentChildrenMetadata.
/**
 * Configures a content query.
 *
 * Content queries are set before the `ngAfterContentInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Directive({
 *   selector: 'someDir'
 * })
 * class SomeDir {
 *   @ContentChildren(ChildDirective) contentChildren: QueryList<ChildDirective>;
 *
 *   ngAfterContentInit() {
 *     // contentChildren is set
 *   }
 * }
 * ```
 * @stable
 * @Annotation
 */
export var ContentChildren: ContentChildrenMetadataFactory =
    makePropDecorator(ContentChildrenMetadata);

// TODO(alexeagle): remove the duplication of this doc. It is copied from ContentChildMetadata.
/**
 * Configures a content query.
 *
 * Content queries are set before the `ngAfterContentInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Directive({
 *   selector: 'someDir'
 * })
 * class SomeDir {
 *   @ContentChild(ChildDirective) contentChild;
 *   @ContentChild('container_ref') containerChild
 *
 *   ngAfterContentInit() {
 *     // contentChild is set
 *     // containerChild is set
 *   }
 * }
 * ```
 *
 * ```html
 * <container #container_ref>
 *   <item>a</item>
 *   <item>b</item>
 * </container>
 * ```
 * @stable
 * @Annotation
 */
export var ContentChild: ContentChildMetadataFactory = makePropDecorator(ContentChildMetadata);

// TODO(alexeagle): remove the duplication of this doc. It is copied from ViewChildrenMetadata.
/**
 * Declares a list of child element references.
 *
 * Angular automatically updates the list when the DOM is updated.
 *
 * `ViewChildren` takes a argument to select elements.
 *
 * - If the argument is a type, directives or components with the type will be bound.
 *
 * - If the argument is a string, the string is interpreted as a list of comma-separated selectors.
 * For each selector, an element containing the matching template variable (e.g. `#child`) will be
 * bound.
 *
 * View children are set before the `ngAfterViewInit` callback is called.
 *
 * ### Example
 *
 * With type selector:
 *
 * ```
 * @Component({
 *   selector: 'child-cmp',
 *   template: '<p>child</p>'
 * })
 * class ChildCmp {
 *   doSomething() {}
 * }
 *
 * @Component({
 *   selector: 'some-cmp',
 *   template: `
 *     <child-cmp></child-cmp>
 *     <child-cmp></child-cmp>
 *     <child-cmp></child-cmp>
 *   `
 * })
 * class SomeCmp {
 *   @ViewChildren(ChildCmp) children:QueryList<ChildCmp>;
 *
 *   ngAfterViewInit() {
 *     // children are set
 *     this.children.toArray().forEach((child)=>child.doSomething());
 *   }
 * }
 * ```
 *
 * With string selector:
 *
 * ```
 * @Component({
 *   selector: 'child-cmp',
 *   template: '<p>child</p>'
 * })
 * class ChildCmp {
 *   doSomething() {}
 * }
 *
 * @Component({
 *   selector: 'some-cmp',
 *   template: `
 *     <child-cmp #child1></child-cmp>
 *     <child-cmp #child2></child-cmp>
 *     <child-cmp #child3></child-cmp>
 *   `
 * })
 * class SomeCmp {
 *   @ViewChildren('child1,child2,child3') children:QueryList<ChildCmp>;
 *
 *   ngAfterViewInit() {
 *     // children are set
 *     this.children.toArray().forEach((child)=>child.doSomething());
 *   }
 * }
 * ```
 *
 * See also: [ViewChildrenMetadata]
 * @stable
 * @Annotation
 */
export var ViewChildren: ViewChildrenMetadataFactory = makePropDecorator(ViewChildrenMetadata);

// TODO(alexeagle): remove the duplication of this doc. It is copied from ViewChildMetadata.
/**
 * Declares a reference to a child element.
 *
 * `ViewChildren` takes a argument to select elements.
 *
 * - If the argument is a type, a directive or a component with the type will be bound.
 *
 * - If the argument is a string, the string is interpreted as a selector. An element containing the
 * matching template variable (e.g. `#child`) will be bound.
 *
 * In either case, `@ViewChild()` assigns the first (looking from above) element if there are
 * multiple matches.
 *
 * View child is set before the `ngAfterViewInit` callback is called.
 *
 * ### Example
 *
 * With type selector:
 *
 * ```
 * @Component({
 *   selector: 'child-cmp',
 *   template: '<p>child</p>'
 * })
 * class ChildCmp {
 *   doSomething() {}
 * }
 *
 * @Component({
 *   selector: 'some-cmp',
 *   template: '<child-cmp></child-cmp>'
 * })
 * class SomeCmp {
 *   @ViewChild(ChildCmp) child:ChildCmp;
 *
 *   ngAfterViewInit() {
 *     // child is set
 *     this.child.doSomething();
 *   }
 * }
 * ```
 *
 * With string selector:
 *
 * ```
 * @Component({
 *   selector: 'child-cmp',
 *   template: '<p>child</p>'
 * })
 * class ChildCmp {
 *   doSomething() {}
 * }
 *
 * @Component({
 *   selector: 'some-cmp',
 *   template: '<child-cmp #child></child-cmp>'
 * })
 * class SomeCmp {
 *   @ViewChild('child') child:ChildCmp;
 *
 *   ngAfterViewInit() {
 *     // child is set
 *     this.child.doSomething();
 *   }
 * }
 * ```
 * See also: [ViewChildMetadata]
 * @stable
 * @Annotation
 */
export var ViewChild: ViewChildMetadataFactory = makePropDecorator(ViewChildMetadata);

// TODO(alexeagle): remove the duplication of this doc. It is copied from PipeMetadata.
/**
 * Declare reusable pipe function.
 *
 * ### Example
 *
 * {@example core/ts/metadata/metadata.ts region='pipe'}
 * @stable
 * @Annotation
 */
export var Pipe: PipeMetadataFactory = <PipeMetadataFactory>makeDecorator(PipeMetadata);

// TODO(alexeagle): remove the duplication of this doc. It is copied from InputMetadata.
/**
 * Declares a data-bound input property.
 *
 * Angular automatically updates data-bound properties during change detection.
 *
 * `InputMetadata` takes an optional parameter that specifies the name
 * used when instantiating a component in the template. When not provided,
 * the name of the decorated property is used.
 *
 * ### Example
 *
 * The following example creates a component with two input properties.
 *
 * ```typescript
 * @Component({
 *   selector: 'bank-account',
 *   template: `
 *     Bank Name: {{bankName}}
 *     Account Id: {{id}}
 *   `
 * })
 * class BankAccount {
 *   @Input() bankName: string;
 *   @Input('account-id') id: string;
 *
 *   // this property is not bound, and won't be automatically updated by Angular
 *   normalizedBankName: string;
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <bank-account bank-name="RBC" account-id="4747"></bank-account>
 *   `,
 *   directives: [BankAccount]
 * })
 * class App {}
 * ```
 * @stable
 * @Annotation
 */
export var Input: InputMetadataFactory = makePropDecorator(InputMetadata);

// TODO(alexeagle): remove the duplication of this doc. It is copied from OutputMetadata.
/**
 * Declares an event-bound output property.
 *
 * When an output property emits an event, an event handler attached to that event
 * the template is invoked.
 *
 * `OutputMetadata` takes an optional parameter that specifies the name
 * used when instantiating a component in the template. When not provided,
 * the name of the decorated property is used.
 *
 * ### Example
 *
 * ```typescript
 * @Directive({
 *   selector: 'interval-dir',
 * })
 * class IntervalDir {
 *   @Output() everySecond = new EventEmitter();
 *   @Output('everyFiveSeconds') five5Secs = new EventEmitter();
 *
 *   constructor() {
 *     setInterval(() => this.everySecond.emit("event"), 1000);
 *     setInterval(() => this.five5Secs.emit("event"), 5000);
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <interval-dir (everySecond)="everySecond()" (everyFiveSeconds)="everyFiveSeconds()">
 *     </interval-dir>
 *   `,
 *   directives: [IntervalDir]
 * })
 * class App {
 *   everySecond() { console.log('second'); }
 *   everyFiveSeconds() { console.log('five seconds'); }
 * }
 * ```
 * @stable
 * @Annotation
 */
export var Output: OutputMetadataFactory = makePropDecorator(OutputMetadata);

// TODO(alexeagle): remove the duplication of this doc. It is copied from HostBindingMetadata.
/**
 * Declares a host property binding.
 *
 * Angular automatically checks host property bindings during change detection.
 * If a binding changes, it will update the host element of the directive.
 *
 * `HostBindingMetadata` takes an optional parameter that specifies the property
 * name of the host element that will be updated. When not provided,
 * the class property name is used.
 *
 * ### Example
 *
 * The following example creates a directive that sets the `valid` and `invalid` classes
 * on the DOM element that has ngModel directive on it.
 *
 * ```typescript
 * @Directive({selector: '[ngModel]'})
 * class NgModelStatus {
 *   constructor(public control:NgModel) {}
 *   @HostBinding('class.valid') get valid() { return this.control.valid; }
 *   @HostBinding('class.invalid') get invalid() { return this.control.invalid; }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `<input [(ngModel)]="prop">`,
 *   directives: [FORM_DIRECTIVES, NgModelStatus]
 * })
 * class App {
 *   prop;
 * }
 * ```
 * @stable
 * @Annotation
 */
export var HostBinding: HostBindingMetadataFactory = makePropDecorator(HostBindingMetadata);

// TODO(alexeagle): remove the duplication of this doc. It is copied from HostListenerMetadata.
/**
 * Declares a host listener.
 *
 * Angular will invoke the decorated method when the host element emits the specified event.
 *
 * If the decorated method returns `false`, then `preventDefault` is applied on the DOM
 * event.
 *
 * ### Example
 *
 * The following example declares a directive that attaches a click listener to the button and
 * counts clicks.
 *
 * ```typescript
 * @Directive({selector: 'button[counting]'})
 * class CountClicks {
 *   numberOfClicks = 0;
 *
 *   @HostListener('click', ['$event.target'])
 *   onClick(btn) {
 *     console.log("button", btn, "number of clicks:", this.numberOfClicks++);
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `<button counting>Increment</button>`,
 *   directives: [CountClicks]
 * })
 * class App {}
 * ```
 * @stable
 * @Annotation
 */
export var HostListener: HostListenerMetadataFactory = makePropDecorator(HostListenerMetadata);
