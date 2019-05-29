class Api::V1::PlayersController < ApplicationController
  before_action :find_player, only: [:destroy]
  def index
    @players = Player.all
    render json: @players
  end

  def create
    @player = Player.new(player_params)
    if @player.save
      render json: @player, status: :accepted
    else
      render json: { errors: @player.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    @player.destroy
    render json: @player
  end

  private

  def player_params
    params.require(:player).permit(:name)
  end

  def find_player
    @player = Player.find(params[:id])
  end
end
