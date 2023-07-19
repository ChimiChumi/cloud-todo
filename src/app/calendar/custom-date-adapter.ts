import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable() // Added Injectable decorator
export class CustomDateAdapter extends NativeDateAdapter {
    override getFirstDayOfWeek(): number {
        return 1; // 1 for Monday
    }
}