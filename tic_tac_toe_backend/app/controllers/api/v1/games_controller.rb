class Api::V1::GamesController < ApplicationController
  before_action :find_game, only: [:update]

  def index
    @games = Game.all
    render json: @games
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      render json: @game, status: :accepted
    else
      render json: { errors: @game.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    @game.update(game_params)
    if @game.save
      render json: @game, status: :accepted
    else
      render json: { errors: @game.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def winner
    @games = Game.get_top_three_winners
    render json: @games
  end

  def stats
    @games = Game.get_single_player_stats
    render json: @games
  end

  private

  def game_params
    params.require(:game).permit(:player_one_id, :player_two_id, :winner)
  end

  def find_game
    @game = Game.find(params[:id])
  end
end
