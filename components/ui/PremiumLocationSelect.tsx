"use client"

import React, { FC } from 'react'
import AsyncSelect from 'react-select/async'
import { StylesConfig, components } from 'react-select'
import { Search, MapPin, Calendar, Users, Home, X, Sparkles } from 'lucide-react'
import { searchCityByName } from '@/services/api'

interface PremiumLocationSelectProps {
  label?: string
  icon?: React.ReactNode
  containerClassName?: string
  className?: string
  placeholder?: string
  value?: any
  onChange?: (value: any) => void
  variant?: 'default' | 'glass'
  menuIsOpen?: boolean
  onMenuOpen?: () => void
  onMenuClose?: () => void
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Search className="w-4 h-4 text-gray-400" />
    </components.DropdownIndicator>
  )
}

const MenuList = (props: any) => {
  return (
    <components.MenuList {...props}>
      <div data-lenis-prevent="true" className="w-full h-full">
        {props.children}
      </div>
    </components.MenuList>
  )
}

const PremiumLocationSelect: FC<PremiumLocationSelectProps> = ({ 
  label = "Location",
  icon = <MapPin className="w-5 h-5 text-[#FF9530]" />,
  containerClassName = "",
  className = "",
  placeholder = "Where is the event?",
  value,
  onChange,
  variant = 'default',
  menuIsOpen,
  onMenuOpen,
  onMenuClose,
}) => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])

  const loadOptions = async (inputValue: string) => {
    if (!inputValue || inputValue.length < 2) return []
    try {
      const response = await searchCityByName(inputValue)
      // The API response structure from searchCityByName needs to be mapped to { value, label }
      // Assuming response is the list of cities based on stay-search behavior
      const cities = response?.data?.records || response?.data || []
      return cities.map((city: any) => ({
        value: city.id,
        label: `${city.name}${city.state_name ? `, ${city.state_name}` : ''}`
      }))
    } catch (error) {
      console.error('Error fetching locations:', error)
      return []
    }
  }

  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      minHeight: 'auto',
      cursor: 'text',
      padding: 0,
      '&:hover': { border: 'none' }
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
      margin: 0,
      flexWrap: 'nowrap',
      overflow: 'hidden',
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
      fontSize: '0.9375rem',
      fontWeight: '600',
      color: variant === 'glass' ? '#ffffff' : '#1E293B',
      caretColor: variant === 'glass' ? '#ffffff' : '#1E293B',
      whiteSpace: 'nowrap',
    }),
    placeholder: (provided) => ({
      ...provided,
      margin: 0,
      color: variant === 'glass' ? 'rgba(255, 255, 255, 0.6)' : '#94A3B8',
      fontSize: '0.9375rem',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
    singleValue: (provided) => ({
      ...provided,
      margin: 0,
      color: variant === 'glass' ? '#ffffff' : '#1E293B',
      fontSize: '0.9375rem',
      fontWeight: '600',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      color: '#FF9530',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '1.5rem',
      padding: '0.6rem',
      backgroundColor: variant === 'glass' ? 'rgba(255, 255, 255, 0.98)' : '#ffffff',
      backdropFilter: variant === 'glass' ? 'blur(20px) saturate(180%)' : 'none',
      WebkitBackdropFilter: variant === 'glass' ? 'blur(20px) saturate(180%)' : 'none',
      border: variant === 'glass' ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid #F1F5F9',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden',
      zIndex: 99999,
      marginTop: '0.5rem',
      width: 'max-content',
      minWidth: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      maxHeight: '300px',
      minWidth: '250px',
      '&::-webkit-scrollbar': { width: '6px' },
      '&::-webkit-scrollbar-track': { background: 'transparent' },
      '&::-webkit-scrollbar-thumb': { background: '#E2E8F0', borderRadius: '10px' },
      '&::-webkit-scrollbar-thumb:hover': { background: '#CBD5E1' },
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: '1rem',
      padding: '0.875rem 1.25rem',
      fontSize: '0.8125rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      marginBottom: '2px',
      whiteSpace: 'nowrap',
      paddingRight: '2.5rem',
      backgroundColor: state.isSelected 
        ? '#FF9530' 
        : state.isFocused 
          ? (variant === 'glass' ? 'rgba(0, 0, 0, 0.05)' : '#FFF7ED') 
          : 'transparent',
      color: state.isSelected 
        ? 'white' 
        : state.isFocused 
          ? (variant === 'glass' ? '#FF9530' : '#FF9530') 
          : (variant === 'glass' ? '#1E293B' : '#475569'),
      '&:active': {
        transform: 'scale(0.98)',
        backgroundColor: '#FF9530',
        color: 'white',
      }
    }),
  }

  return (
    <div className={`flex items-center relative ${className} ${containerClassName}`}>
      {icon && <div className="shrink-0 mr-2.5 transition-transform group-hover:scale-110">{icon}</div>}
      <div className="flex-1 text-left min-w-0">
        {label && <p className={`text-[12px] font-semibold capitalize mb-0.5 ${variant === 'glass' ? 'text-white/60' : 'text-gray-500'}`}>{label}</p>}
        {mounted && (
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            value={value}
            onChange={onChange}
            styles={customStyles}
            components={{ DropdownIndicator: () => null, MenuList }}
            placeholder={placeholder}
            className="premium-select-container"
            classNamePrefix="premium-select"
            noOptionsMessage={({ inputValue }) => !inputValue ? "Type to search..." : "No locations found"}
            loadingMessage={() => "Searching..."}
            menuIsOpen={menuIsOpen}
            onMenuOpen={onMenuOpen}
            onMenuClose={onMenuClose}
          />
        )}
      </div>
      {value && (
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            onChange?.(null); 
          }}
          className="p-1.5 hover:bg-orange-50 rounded-full transition-all mr-2 group-hover:bg-orange-50/50"
        >
          <X className="w-4 h-4 text-[#FF9530]" />
        </button>
      )}
    </div>
  )
}

export default PremiumLocationSelect
