const NAMESPACE = 'tenant_interaction'
enum SECTION_TYPES {
  POLL = 'poll',
  VOTE = 'vote'
}
interface Tenant_interaction {
  group_public: {
    $interact_id: {
      created_time: number
      begin_time: number
      end_time: number
      title: string
      owner_id: string
      owner_name: string
    }
  }
  user_interact: {
    $interact_id: {
      // is_master: boolean
      display: {
        section: {
          type: SECTION_TYPES
          index: number
          title: string
          options: {}
          result: {}
        }
        ux: string
        num_player: number
        num_answer: number
        time: number
        // started_time: number
        // finished_time: number
      }
      display_user: {
        $user_id: {
          success: number
          fail: number
          group_index: number
          user_ux: string
          shard_id: string
        }
      }
      display_controller: {
        controller_ux: string
        next_item: object
        msg: string
      }
      // input data
      entries: {
        checkin: {
          $user_id: number
        }
        answer: {
          $section_index: {
            $user_group_index: {
              $user_id: {
                // onCreate
                created_time: number
                data: number
              }
            }
          }
        }
      }
      section_data: {
        $index: object
      }
      // modules split
      modules: {
        counters: {
          workspace: {
            $section_index: {
              $option_index: {
                $timestamp_instance: number
              }
            }
          }
          result: {
            $section_index: {
              $option_index: number
            }
          }
        }
        check_answer: {
          workspace: {
            $section_index: {
              groups: {
                $group_index: {
                  answer: object // onCreate: func_check_answer
                  finished_time: number
                }
              }
              num_working: number
            }
          }
          result: {
            $section_index: {
              num_win: number
              num_lost: number
              num_revived: number
            }
          }
        }

        game_control: {
          current_index: number // -1, 0, 1, 2, 3...
          next_item: object
          num_items: number
          game_ux: string
          updated_time: number // prevent fast change < 1s
        }
      }
    }
  }
}

// polls, predict  --> result: { option_index: number, answer_index: number }
// rating --> result: { 1: number, 2: number, 3: number, 4: number, 5: number, average: number, total: number }

// ==== functions ======
// onCreate: modules/check_answer/{section_index}/{group_index}/answer
function func_check_answer() {
  /*
  1. check answer group_index
  2. snap.ref.parent.child('num_working').transaction(s => {
      const n = Number(s) || 0
      if (n <= 0) {
        // trigger finshed check_answer
      } else {
        return n - 1
      }
  })
  */
}
