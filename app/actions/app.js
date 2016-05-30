/**
 * General app wide action creators.
 */

import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
} from './types'

export function openDrawer() {
  return {
    type: OPEN_DRAWER
  }
}

export function closeDrawer() {
  return {
    type: CLOSE_DRAWER
  }
}