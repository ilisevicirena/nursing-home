import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: "input:not([autocomplete]), textarea:not([autocomplete])",
})
export class DisableAutocompleteDirective {
  @HostBinding("attr.autocomplete") autocomplete = "off";
}
