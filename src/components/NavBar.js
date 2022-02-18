import React, { useEffect, useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = (props) => {
  const [logginOut, setStateLogout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  function useQuery() {
    console.log("in the hook ", useLocation().search);

    return new URLSearchParams(useLocation().search);
  }

  const Culture = () => {
    let query = useQuery();

    const parsedHash = new URLSearchParams(window.location.hash.substr(1));

    let culture = query.get("culture") ?? parsedHash.get("culture");

    return culture;
  };

  const [culture, setCulture] = useState(Culture() || "en-us");

  console.log("-------->", setCulture);

  const AffId = () => {
    let query = useQuery();

    const parsedHash = new URLSearchParams(window.location.hash.substr(1));

    let culture = query.get("affid") ?? parsedHash.get("affid");

    return culture;
  };
  const AAIParams = () => {
    let query = useQuery();

    const parsedHash = new URLSearchParams(window.location.hash.substr(1));

    let culture = query.get("aai") || parsedHash.get("aai") || "";

    return culture;
  };
  const [login_hint, seetLoginHint] = useState(AAIParams());

  console.log(seetLoginHint);

  const [affid, setAffId] = useState(AffId() || "0");
  console.log(setAffId);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const getAccessToken = async () => {
    if (isAuthenticated) {
      const data = await getAccessTokenSilently({ detailedResponse: true });
      const data2 = await getIdTokenClaims();
      props.setResponse({ AccessToken: data, IdToken: data2?.__raw });
    }
  };
  useEffect(() => {
    getAccessToken();
    // eslint-disable-next-line
  }, []);

  const logoutWithRedirect = () => {
    setStateLogout(true);
    props.setResponse({ AccessToken: "", IdToken: "" });
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <div className="nav-container">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/otp"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  OTP
                </NavLink>
              </NavItem>
              {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/external-api"
                    exact
                    activeClassName="router-link-exact-active"
                  >
                    External API
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/tokens-flow"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Token
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    disabled={logginOut}
                    style={{ background: logginOut ? "grey" : "" }}
                    onClick={() => {
                      return loginWithRedirect({
                        culture: culture,
                        affid: affid,
                        aai: login_hint,
                        // &aai=${JSON.stringify(
                        //   {
                        //     ea: "value",
                        //     cc: "value",
                        //   }
                        // )}`,
                        // appState: {
                        //   returnTo: "?culture=en-gb&aff_id=105",
                        // },
                      });
                    }}
                  >
                    Log in
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block
                    onClick={() =>
                      loginWithRedirect({
                        fragment: "culture=en-us&aff_id=0",
                      })
                    }
                  >
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => {
                      return logoutWithRedirect();
                    }}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
