import {
  Autocomplete,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { checkTextDir, sxWithFaFont, useCacheRequest } from '../utils';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { debounce } from '@mui/material/utils';

export interface FetchCallbackProps {
  error?: any;
  results?: readonly PlaceType[];
}

const fetch = debounce(
  async (
    requestUrl: string,
    callback: (props?: FetchCallbackProps) => void,
  ) => {
    try {
      const result = await useCacheRequest(requestUrl);

      if (result.results === undefined || result.results === null) {
        callback();
        return;
      }

      callback({
        results: (result.results as PlaceType[]).map(
          ({ admin1, country, latitude, longitude, name, admin2 }) => ({
            name,
            latitude,
            longitude,
            country,
            admin1,
            admin2,
          }),
        ),
      });
    } catch (error: any) {
      callback({ error });
    }
  },
  500,
);

const LocationAutocomplete = styled(Autocomplete)(({ theme }) => [
  {
    width: '295px',
    '& .MuiAutocomplete-input': {
      fontFamily: 'IRANYekanX VF',
    },
  },
  theme.applyStyles('dark', {
    '& fieldset': {
      borderColor: '#757575',
    },
    '& label': {
      color: '#B3B3B3',
    },
    '& svg': {
      color: '#757575',
    },
  }),
]);

export interface PlaceType {
  country: string;
  latitude: number;
  longitude: number;
  name: string;
  admin1: string;
  admin2?: string;
}

const defaultLocations: PlaceType[] = [
  {
    country: 'Iran',
    name: 'Tehran',
    latitude: 35.69439,
    longitude: 51.42151,
    admin1: 'Tehran',
  },
  {
    country: 'Germany',
    name: 'Berlin',
    latitude: 52.52437,
    longitude: 13.41053,
    admin1: 'State of Berlin',
  },
  {
    country: 'Türkiye',
    name: 'Ankara',
    latitude: 39.91987,
    longitude: 32.85427,
    admin1: 'Ankara',
  },
  {
    country: 'United Kingdom',
    name: 'London',
    latitude: 51.50853,
    longitude: -0.12574,
    admin1: 'England',
  },
  {
    country: 'United States',
    name: 'Washington',
    latitude: 38.89511,
    longitude: -77.03637,
    admin1: 'District of Columbia',
  },
  {
    country: 'Russia',
    name: 'Moscow',
    latitude: 55.75222,
    longitude: 37.61556,
    admin1: 'Moscow',
  },
  {
    country: 'France',
    name: 'Paris',
    latitude: 48.85341,
    longitude: 2.3488,
    admin1: 'Île-de-France',
  },
  {
    country: 'Italy',
    name: 'Rome',
    latitude: 41.89193,
    longitude: 12.51133,
    admin1: 'Lazio',
  },
  {
    country: 'China',
    name: 'Beijing',
    latitude: 39.9075,
    longitude: 116.39723,
    admin1: 'Beijing',
  },
  {
    country: 'Japan',
    name: 'Tokyo',
    latitude: 35.6895,
    longitude: 139.69171,
    admin1: 'Tokyo',
  },
];

export interface SearchItemProps extends React.HTMLAttributes<HTMLLIElement> {
  option: PlaceType;
  isRTL: boolean;
}

const SearchItem: React.FC<SearchItemProps> = ({
  option,
  isRTL,
  ...otherProps
}) => {
  return (
    <li {...otherProps} style={{ width: '100%' }}>
      <Stack dir={isRTL ? 'rtl' : 'ltr'} flexGrow={1}>
        <Typography sx={{ fontFamily: 'IRANYekanX VF' }}>
          {option.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={[
            () => ({
              marginInlineStart: '5px',
              fontSize: '14px',
              fontFamily: 'IRANYekanX VF',
              color: 'grey.700',
            }),
            (theme) =>
              theme.applyStyles('dark', {
                color: 'grey.400',
              }),
          ]}
        >
          {option.country}, {option.admin1}
          {option.admin2 ? `, ${option.admin2}` : null}
        </Typography>
      </Stack>
    </li>
  );
};

export const SearchLocation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const translatedDefLocations = useMemo(
    () =>
      defaultLocations.map(({ admin1, country, name, ...other }) => ({
        admin1: t(admin1),
        country: t(country),
        name: t(name),
        ...other,
      })),
    [i18n.language],
  );
  const [value, setValue] = useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly PlaceType[]>(
    translatedDefLocations,
  );
  const [loading, setLoading] = useState(false);
  const [noOptionsText, setNoOptionsText] = useState(t('noLocation'));
  const [eventsCount, setEventsCount] = useState(0);
  const [isRTL, setIsRTL] = useState(i18n.language === 'fa');

  useEffect(() => {
    if (inputValue === '') {
      setIsRTL(i18n.language === 'fa');
      setLoading(false);
      setOptions(translatedDefLocations);
      return;
    }

    let active = true;

    if (eventsCount === 1) {
      fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=10&language=${isRTL ? 'fa' : 'en'}&format=json`,
        (props?: FetchCallbackProps) => {
          if (!active) {
            return;
          }

          setLoading(false);

          if (props?.error) {
            setNoOptionsText(t('locationSearchErr'));
            setOptions([]);
            return;
          }

          if (
            props === undefined ||
            props === null ||
            props.results === undefined ||
            props.results === null
          ) {
            setNoOptionsText(t('noLocation'));
            setOptions([]);
            return;
          }

          setOptions(props.results);
        },
      );
    } else {
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [inputValue, i18n.language]);

  return (
    <LocationAutocomplete
      size="small"
      autoComplete
      includeInputInList
      disablePortal
      sx={sxWithFaFont(i18n.language, null, {
        '& label, & fieldset': {
          fontFamily: 'IRANYekanX VF',
        },
      })}
      getOptionLabel={(option) => (option as PlaceType).name}
      filterOptions={(x) => x}
      onChange={(_, newValue) => {
        setEventsCount(2);
        setValue(newValue as any);
      }}
      onInputChange={(_, newInputValue) => {
        setIsRTL(checkTextDir(newInputValue));
        setEventsCount(1);
        !loading && setLoading(true);
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('locationSearchSelect')}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            },
          }}
        />
      )}
      renderOption={({ key, ...props }, option: any) => {
        return (
          <SearchItem
            key={`${option.latitude}-${option.longitude}`}
            {...props}
            option={option as PlaceType}
            {...{ isRTL }}
          />
        );
      }}
      {...{ options, value, noOptionsText }}
    />
  );
};

export default SearchLocation;
