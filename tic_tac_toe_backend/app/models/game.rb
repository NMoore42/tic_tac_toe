class Game < ApplicationRecord
  belongs_to :player_one, class_name: :Player, foreign_key: :player_one_id
  belongs_to :player_two, class_name: :Player, foreign_key: :player_two_id


  def self.get_games_played
    games_player_one = self.all.group_by{ |game| game.player_one_id}.map{|key, value| {key=>value.count}}
    games_player_two = self.all.group_by{ |game| game.player_two_id}.map{|key, value| {key=>value.count}}
    all_games_sep = games_player_one + games_player_two
    all_games_combined = all_games_sep.inject{|memo, el| memo.merge( el ){|k, old_v, new_v| old_v + new_v}}
  end

  def self.get_top_three_winners
    games_won_with_nil = self.all.group_by{ |game| game.winner}.map{|key, value| {key=>value.count}}
    games_won = games_won_with_nil.select{|obj| obj.keys[0] != nil }
    sorted_games_won = games_won.sort_by{|obj| obj.values}.reverse
    top_three = sorted_games_won.slice(0, 3)
    top_three.map{|obj| {id: obj.keys[0], games_won: obj.values[0], name: Player.find(obj.keys[0]).name, games_played: Game.get_games_played[obj.keys[0]]}}
  end

  def self.get_single_player_stats
    games_won_with_nil = self.all.group_by{ |game| game.winner}.map{|key, value| {key=>value.count}}
    games_won = games_won_with_nil.select{|obj| obj.keys[0] != nil }
    sorted_games_won = games_won.sort_by{|obj| obj.values}.reverse
    top_three = sorted_games_won
    top_three.map{|obj| {id: obj.keys[0], games_won: obj.values[0], name: Player.find(obj.keys[0]).name, games_played: Game.get_games_played[obj.keys[0]]}}
  end


end
