import { ButtonPropsVariantOverrides } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

export interface FilterProps { }

export type AdvanceFilterColumnType = 'text' | 'select'

export interface HilabsAdvanceFilterProps {
    addNewCondition?: string,
    cancelButtonText?: string,
    saveFilterButtonText?: string,
    applyFilterButtonText?: string,
    cancelButtonVariant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>,
    saveFilterButtonVariant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>,
    applyFilterButtonVariant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>,
    buttonPrimaryColor?: string,
    conditions: Array<any>,
    columnOptions: Array<HilabsAdvanceFilterColumnOptionsProps>,
    onSaveFilter: CallableFunction,
    onClear: CallableFunction
    onSubmit: CallableFunction,
}

export interface HilabsAdvanceFilterColumnOptionsProps {
    id: string,
    value: string,
    type?: AdvanceFilterColumnType,
    selectOptions?: Array<any> | []
}