import { Component } from '@angular/core';

@Component({
  selector: 'ngx-ecommerce',
  styles:  [
    `
    .hidden {
    display: none;
  }
  `
  ],
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {
  
  selectedItem: string[] = ['all'];

  onGraphSelectionChange(selectedValues: string[]) {
    // Get all division IDs
    const divisionIds = [
      'incidentPerStatus',
      'incidentPerSeverityAndType',
      'incidentSummary',
      'incidentPerSeverity',
      'incidentPerProject'
    ];
    
    // Show or hide divisions based on selection
    divisionIds.forEach(id => {
      const division = document.getElementById(id);
      if (division) {
        if (selectedValues.includes('all') || selectedValues.includes(id)) {
          division.classList.remove('hidden');
        } else {
          division.classList.add('hidden');
        }
      }
    });
  }
}
