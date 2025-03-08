// generic-input.component.ts
import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';

@Component({
  selector: 'app-generic-input',
  standalone: true, // Assuming you're using Angular standalone components
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule
  ],
  templateUrl: './generic-input.component.html',
  styleUrl: './generic-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInputComponent),
      multi: true
    }
  ]
})
export class GenericInputComponent implements OnInit, OnChanges {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'password' | 'email' | 'number' | 'tel' = 'text';
  @Input() status: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'basic';
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() fieldSize: 'tiny' | 'small' | 'medium' | 'large' | 'giant' = 'medium';
  @Input() errorMessage: string = '';
  @Input() hintMessage: string = '';
  
  inputControl = new FormControl('');
  showPassword: boolean = false;
  
  // ControlValueAccessor interface
  private onChange: any = () => {};
  private onTouched: any = () => {};
  
  constructor() { }

  ngOnInit(): void {
    // Subscribe to value changes and propagate them
    this.inputControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // Handle disabled state changes
    if (changes['disabled']) {
      if (this.disabled) {
        this.inputControl.disable();
      } else {
        this.inputControl.enable();
      }
    }
  }
  
  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.inputControl.setValue(value, { emitEvent: false });
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.disabled) {
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }
  
  onBlur(): void {
    this.onTouched();
  }
  
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
  
  getInputType(): string {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }
}