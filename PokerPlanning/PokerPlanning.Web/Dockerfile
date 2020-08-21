#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base

# Setup NodeJs
# Setup NodeJs
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y build-essential nodejs

WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["PokerPlanning.Web/PokerPlanning.Web.csproj", "PokerPlanning.Web/"]
COPY ["PokerPlanning.Data/PokerPlanning.Data.csproj", "PokerPlanning.Data/"]
COPY ["PokerPlanning.Core/PokerPlanning.Core.csproj", "PokerPlanning.Core/"]
COPY ["PokerPlanning.Network/PokerPlanning.Network.csproj", "PokerPlanning.Network/"]
RUN dotnet restore "PokerPlanning.Web/PokerPlanning.Web.csproj"
COPY . .
WORKDIR "/src/PokerPlanning.Web"
RUN dotnet build "PokerPlanning.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PokerPlanning.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PokerPlanning.Web.dll"]