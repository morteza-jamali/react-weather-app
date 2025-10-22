import {
  Button,
  Popover,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { styled, useColorScheme } from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { sxWithFaFont } from '../utils/sxWithFaFont';
import useUserInfo from '../hooks/use-user-info';
import useLanguage from '../hooks/use-language';
import LoadingPageContext from '../contexts/LoadingPageContext';

const SettingsButton = styled(Button)(({ theme }) => [
  {
    borderColor: '#BBC1C4',
    color: '#BBC1C4',
    width: '40px',
    height: '40px',
    minWidth: '40px',
    borderRadius: '8px',
    '& .MuiButton-icon': {
      margin: 0,
    },
  },
  theme.applyStyles('dark', {
    borderColor: '#757575',
    color: '#757575',
  }),
]);

const ModeToggleGroup = styled(ToggleButtonGroup)({
  height: '33px',
  '& .MuiToggleButton-root': {
    flexGrow: 1,
    textTransform: 'none',
    gap: '8px',
    borderColor: '#8895A0',
    color: '#8895A0',
  },
  '& .MuiToggleButton-root.Mui-selected': {
    color: '#2196F3',
    borderColor: '#2196F3',
    backgroundColor: 'transparent',
  },
  '& .MuiToggleButton-root span': {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '150%',
    letterSpacing: '0.15px',
  },
  '& .MuiSvgIcon-root': {
    width: '12px',
    height: '12px',
  },
});

const ToggleGroupLabel = styled('span')(({ theme }) => [
  {
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  theme.applyStyles('dark', {
    color: 'rgba(255, 255, 255, 0.87)',
  }),
]);

const ToggleGroupRoot = styled(Stack)(({ theme }) => [
  {
    paddingBottom: '12.5px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    marginBottom: '8.5px !important',
  },
  theme.applyStyles('dark', {
    borderBottomColor: 'rgba(255, 255, 255, 0.12)',
  }),
]);

const ExitButton = styled(Button)(({ theme }) => [
  {
    gap: '4px',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)',
    justifyContent: 'start',
    '& .MuiSvgIcon-root': {
      width: '24px',
      height: '24px',
    },
    '& .MuiButton-startIcon': {
      marginRight: 0,
    },
  },
  theme.applyStyles('dark', {
    color: 'rgba(255, 255, 255, 0.87)',
  }),
]);

export const SettingsMenu: React.FC = () => {
  const { logout } = useUserInfo();
  const { changeLang } = useLanguage();
  const { setMode, mode } = useColorScheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [pageLoading, setPageLoading] = useContext(LoadingPageContext);

  useEffect(() => {
    pageLoading && setPageLoading(false);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const exitHandler = () => {
    setPageLoading(true);
    logout();
    navigate('/login');
  };

  const changeLanguageHandler = (
    _: React.MouseEvent<HTMLElement>,
    newLang: string,
  ) => {
    changeLang(newLang);
  };

  const changeModeHandler = (
    _: React.MouseEvent<HTMLElement>,
    newMode: string,
  ) => {
    setMode(newMode as any);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'settings-popover' : undefined;

  return (
    <div>
      <SettingsButton
        aria-label="settings menu"
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        endIcon={<SettingsOutlinedIcon sx={{ width: '18px' }} />}
        sx={
          open
            ? {
                borderColor: '#009CD8',
                color: '#009CD8',
                backgroundColor: '#CFEDFA',
              }
            : null
        }
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        elevation={8}
        sx={{
          '& .MuiPopover-paper': {
            width: '220px',
            marginLeft: '-8px',
            marginTop: '8px',
            borderRadius: '8px',
            padding: '8px 16px',
          },
        }}
      >
        <Stack spacing="4px">
          <ToggleGroupRoot>
            <ToggleGroupLabel>{t('mode')}</ToggleGroupLabel>
            <ModeToggleGroup
              color="primary"
              value={mode}
              exclusive
              aria-label="mode"
              size="small"
              onChange={changeModeHandler}
            >
              <ToggleButton value="light" sx={sxWithFaFont(i18n.language)}>
                <WbSunnyOutlinedIcon />
                <span>{t('light')}</span>
              </ToggleButton>
              <ToggleButton
                value="dark"
                sx={sxWithFaFont(
                  i18n.language,
                  mode === 'light'
                    ? {
                        borderLeftColor: 'transparent !important',
                      }
                    : null,
                )}
              >
                <BedtimeOutlinedIcon />
                <span>{t('dark')}</span>
              </ToggleButton>
            </ModeToggleGroup>
          </ToggleGroupRoot>
          <ToggleGroupRoot>
            <ToggleGroupLabel>{t('language')}</ToggleGroupLabel>
            <ModeToggleGroup
              color="primary"
              value={i18n.language}
              exclusive
              aria-label="mode"
              size="small"
              onChange={changeLanguageHandler}
            >
              <ToggleButton value="en" sx={sxWithFaFont(i18n.language)}>
                <span>{t('en')}</span>
              </ToggleButton>
              <ToggleButton
                value="fa"
                sx={sxWithFaFont(
                  i18n.language,
                  i18n.language === 'en'
                    ? {
                        borderLeftColor: 'transparent !important',
                      }
                    : null,
                )}
              >
                <span>{t('fa')}</span>
              </ToggleButton>
            </ModeToggleGroup>
          </ToggleGroupRoot>
          <ExitButton
            startIcon={<LogoutOutlinedIcon />}
            variant="text"
            onClick={exitHandler}
            sx={sxWithFaFont(i18n.language)}
          >
            {t('exit')}
          </ExitButton>
        </Stack>
      </Popover>
    </div>
  );
};

export default SettingsMenu;
