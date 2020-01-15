const app = require('./index')

const NAMESPACE = 'tenant_interaction'
const SECTION_TYPES = {
  POLL: 'poll',
  VOTE: 'vote',
}
const GAME_UX = {
  no_game: 'no-game',
  show_mc: 'show-mc',
  during_question: 'show-question',
  during_result: 'show-answer',
  during_scores: 'show-scores',
  during_winners: 'show-winners',
  last_winner: 'show-last-winner',
}
const USER_UX = {
  lost: 'lost',
  reviving: 'reviving',
  alive: 'alive',
  late: 'late',
}
const CONTROLLER_UX = {
  no_game: 'no-game',
  show_mc: 'show-mc',
  during_question: 'show-question',
  during_result: 'show-answer',
  during_scores: 'show-scores',
  during_winners: 'show-winners',
  last_winner: 'show-last-winner',
}
const Tenant_interaction = {
  group_public: {
    _interact_id: {
      created_time: new Date().getTime(),
      begin_time: new Date().getTime(),
      end_time: new Date().getTime(),
      title: 'string',
      owner_id: 'string',
      owner_name: 'string',
    },
  },
  user_interact: {
    _interact_id: {
      // is_master: boolean
      display: {
        section: {
          type: SECTION_TYPES.POLL,
          index: 2,
          title: 'string',
          options: '{}',
          result: '{}',
        },
        ux: GAME_UX.during_question,
        num_player: 1000,
        num_answer: 1000,
        time: new Date().getTime(),
        // started_time: number
        // finished_time: number
      },
      display_user: {
        _user_id: {
          success: 100,
          fail: 900,
          group_index: 1,
          user_ux: USER_UX.alive,
          shard_id: 'abc',
        },
        _user_id1: {
          success: 100,
          fail: 900,
          group_index: 1,
          user_ux: USER_UX.alive,
          shard_id: 'abc',
        },
        _user_id2: {
          success: 100,
          fail: 900,
          group_index: 1,
          user_ux: USER_UX.alive,
          shard_id: 'abc',
        },
      },
      display_controller: {
        controller_ux: CONTROLLER_UX.during_question,
        next_item: '{}',
        msg: 'string',
      },
      // input data
      entries: {
        checkin: {
          _user_id: new Date().getTime(),
          _user_id1: new Date().getTime(),
          _user_id2: new Date().getTime(),
          _user_id3: new Date().getTime(),
        },
        answer: {
          _section_index: {
            _user_group_index: {
              _user_id: {
                // onCreate
                created_time: new Date().getTime(),
                data: '{}' || 0,
              },
              _user_id1: {
                // onCreate
                created_time: new Date().getTime(),
                data: '{}' || 0,
              },
            },
            _user_group_index2: {
              _user_id: {
                // onCreate
                created_time: new Date().getTime(),
                data: '{}' || 0,
              },
              _user_id1: {
                // onCreate
                created_time: new Date().getTime(),
                data: '{}' || 0,
              },
            },
          },
          _section_index2: {
            _user_group_index: {
              _user_id: {
                // onCreate
                created_time: new Date().getTime(),
                data: '{}' || 0,
              },
              _user_id1: {
                // onCreate
                created_time: new Date().getTime(),
                data: '{}' || 0,
              },
            },
            _user_group_index2: {
              _user_id: {
                // onCreate
                created_time: new Date().getTime(),
                data: '{}' || 0,
              },
              _user_id1: {
                // onCreate
                created_time: new Date().getTime(),
                data: '{}' || 0,
              },
            },
          },
        },
      },
      section_data: {
        _index: {
          /* section data */
        },
        _index1: {
          /* section data */
        },
        _index2: {
          /* section data */
        },
        _index3: {
          /* section data */
        },
        _index4: {
          /* section data */
        },
      },
      // modules split
      modules: {
        counters: {
          workspace: {
            _section_index: {
              _option_index: {
                _timestamp_instance: new Date().getTime(),
              },
              _option_index1: {
                _timestamp_instance: new Date().getTime(),
              },
            },
          },
          result: {
            _section_index: {
              _option_index: 5,
              _option_index1: 5,
            },
          },
        },
        check_answer: {
          workspace: {
            _section_index: {
              groups: {
                _group_index: {
                  answer: '{}', // onCreate: func_check_answer
                  finished_time: new Date().getTime(),
                },
              },
              num_working: 2,
            },
          },
          result: {
            _section_index: {
              num_win: 12,
              num_lost: 32,
              num_revived: 52,
            },
          },
        },
        game_control: {
          current_index: 1, // -1, 0, 1, 2, 3...
          next_item: '{}',
          num_items: 10,
          game_ux: GAME_UX.during_question,
          updated_time: new Date().getTime(), // prevent fast change < 1s
        },
      },
    },
  },
}

app
  .database()
  .ref(NAMESPACE)
  .set(Tenant_interaction)
  .then(() => process.exit(1))
